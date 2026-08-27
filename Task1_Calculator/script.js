/* ===========================================================
   Voltmeter — Scientific Calculator logic
   No eval() — expressions are tokenised and evaluated with a
   small recursive-descent parser that respects precedence,
   parentheses and unary functions (sin, log, sqrt, etc.)
   =========================================================== */

(() => {
  'use strict';

  // ---------- DOM references ----------
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const memFlag = document.getElementById('memFlag');
  const sciGrid = document.getElementById('sciGrid');
  const historyStrip = document.getElementById('historyStrip');
  const historyEmpty = document.getElementById('historyEmpty');
  const historyList = document.getElementById('historyList');
  const historyPanel = document.getElementById('historyPanel');
  const scrim = document.getElementById('scrim');
  const themeToggle = document.getElementById('themeToggle');
  const modeBtns = document.querySelectorAll('.mode-btn');

  // ---------- State ----------
  let expr = '';          // raw expression string being built, e.g. "12+8*2"
  let justEvaluated = false;
  let memoryValue = 0;
  let hasMemory = false;
  let history = [];       // {expr, result}

  const FUNCS = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'];

  // ---------- Display helpers ----------
  function prettify(str) {
    return str
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/-/g, '−')
      .replace(/sqrt/g, '√');
  }

  function render() {
    expressionEl.textContent = prettify(expr);
    memFlag.classList.toggle('is-visible', hasMemory);
  }

  function showResult(value, isError = false) {
    resultEl.classList.remove('pulse');
    void resultEl.offsetWidth; // restart animation
    resultEl.classList.add('pulse');
    resultEl.classList.toggle('is-error', isError);
    resultEl.textContent = value;
  }

  function formatNumber(n) {
    if (!isFinite(n)) return 'Error';
    if (Object.is(n, -0)) n = 0;
    // Trim floating point noise, cap at 10 significant digits
    const rounded = parseFloat(n.toPrecision(10));
    return rounded.toString();
  }

  // ---------- Tokeniser ----------
  function tokenize(input) {
    const tokens = [];
    let i = 0;
    while (i < input.length) {
      const ch = input[i];
      if (ch === ' ') { i++; continue; }
      if (/[0-9.]/.test(ch)) {
        let num = ch;
        i++;
        while (i < input.length && /[0-9.]/.test(input[i])) { num += input[i]; i++; }
        tokens.push({ type: 'num', value: parseFloat(num) });
        continue;
      }
      const funcMatch = FUNCS.find(f => input.startsWith(f, i));
      if (funcMatch) {
        tokens.push({ type: 'func', value: funcMatch });
        i += funcMatch.length;
        continue;
      }
      if (input.startsWith('pi', i)) { tokens.push({ type: 'num', value: Math.PI }); i += 2; continue; }
      if (ch === 'e' && !/[a-zA-Z]/.test(input[i + 1] || '')) {
        tokens.push({ type: 'num', value: Math.E }); i++; continue;
      }
      if ('+-*/^!()%'.includes(ch)) {
        tokens.push({ type: 'op', value: ch });
        i++;
        continue;
      }
      // Unknown character — skip defensively
      i++;
    }
    return tokens;
  }

  // ---------- Recursive-descent parser ----------
  // Grammar: expr -> term (('+'|'-') term)*
  //          term -> unary (('*'|'/') unary)*
  //          unary -> '-' unary | postfix
  //          postfix -> power ('%')?
  //          power -> atom ('^' unary)?
  //          atom -> number | func atom | '(' expr ')'
  function parse(tokens) {
    let pos = 0;
    const peek = () => tokens[pos];
    const consume = () => tokens[pos++];

    function parseExpr() {
      let left = parseTerm();
      while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
        const op = consume().value;
        const right = parseTerm();
        left = op === '+' ? left + right : left - right;
      }
      return left;
    }

    function parseTerm() {
      let left = parseUnary();
      while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/')) {
        const op = consume().value;
        const right = parseUnary();
        if (op === '/') {
          if (right === 0) throw new Error('DIV0');
          left = left / right;
        } else {
          left = left * right;
        }
      }
      return left;
    }

    function parseUnary() {
      if (peek() && peek().type === 'op' && peek().value === '-') {
        consume();
        return -parseUnary();
      }
      return parsePostfix();
    }

    function parsePostfix() {
      let value = parsePower();
      while (peek() && peek().type === 'op' && peek().value === '%') {
        consume();
        value = value / 100;
      }
      while (peek() && peek().type === 'op' && peek().value === '!') {
        consume();
        value = factorial(value);
      }
      return value;
    }

    function parsePower() {
      const base = parseAtom();
      if (peek() && peek().type === 'op' && peek().value === '^') {
        consume();
        const exponent = parseUnary();
        return Math.pow(base, exponent);
      }
      return base;
    }

    function parseAtom() {
      const tok = peek();
      if (!tok) throw new Error('SYNTAX');

      if (tok.type === 'num') { consume(); return tok.value; }

      if (tok.type === 'func') {
        consume();
        const arg = parseUnary();
        switch (tok.value) {
          case 'sin': return Math.sin(toRadians(arg));
          case 'cos': return Math.cos(toRadians(arg));
          case 'tan': return Math.tan(toRadians(arg));
          case 'log': return Math.log10(arg);
          case 'ln': return Math.log(arg);
          case 'sqrt':
            if (arg < 0) throw new Error('NEG_SQRT');
            return Math.sqrt(arg);
          default: throw new Error('SYNTAX');
        }
      }

      if (tok.type === 'op' && tok.value === '(') {
        consume();
        const value = parseExpr();
        if (!peek() || peek().value !== ')') throw new Error('SYNTAX');
        consume();
        return value;
      }

      throw new Error('SYNTAX');
    }

    const result = parseExpr();
    if (pos !== tokens.length) throw new Error('SYNTAX');
    return result;
  }

  function toRadians(deg) { return deg * (Math.PI / 180); }

  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) throw new Error('FACT');
    if (n > 170) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  function evaluate(str) {
    if (!str.trim()) return 0;
    const tokens = tokenize(str);
    return parse(tokens);
  }

  // ---------- Error messaging ----------
  function errorMessage(err) {
    switch (err.message) {
      case 'DIV0': return 'Can\u2019t divide by zero';
      case 'NEG_SQRT': return 'No square root of a negative number';
      case 'FACT': return 'Factorial needs a whole number ≥ 0';
      default: return 'Check your expression';
    }
  }

  // ---------- History ----------
  function pushHistory(exprStr, resultStr) {
    history.unshift({ expr: exprStr, result: resultStr });
    if (history.length > 50) history.pop();
    renderHistory();
  }

  function renderHistory() {
    if (history.length === 0) {
      historyStrip.innerHTML = '<span class="history-empty" id="historyEmpty">History will collect here as you calculate</span>';
      historyList.innerHTML = '<li class="history-placeholder">Nothing calculated yet. Your first result will land here.</li>';
      return;
    }
    // Strip: last 6 compact entries
    historyStrip.innerHTML = history.slice(0, 6).map(h =>
      `<span class="history-chip">${prettify(h.expr)} = ${h.result}</span>`
    ).join('<span style="opacity:.3"> · </span>');

    // Panel: full list, clickable to reload
    historyList.innerHTML = history.map((h, idx) =>
      `<li data-idx="${idx}"><span class="history-entry-expr">${prettify(h.expr)}</span>${h.result}</li>`
    ).join('');
  }

  historyList.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-idx]');
    if (!li) return;
    const entry = history[Number(li.dataset.idx)];
    expr = String(entry.result);
    justEvaluated = false;
    render();
    showResult(entry.result);
    closeHistoryPanel();
  });

  document.getElementById('clearHistory').addEventListener('click', () => {
    history = [];
    renderHistory();
  });

  function openHistoryPanel() {
    historyPanel.hidden = false;
    scrim.hidden = false;
  }
  function closeHistoryPanel() {
    historyPanel.hidden = true;
    scrim.hidden = true;
  }
  document.getElementById('closeHistory').addEventListener('click', closeHistoryPanel);
  scrim.addEventListener('click', closeHistoryPanel);

  // ---------- Core input handling ----------
  function appendToExpr(value) {
    if (justEvaluated) {
      // Start fresh after a result, unless continuing with an operator
      const isOperatorStart = /^[+\-*/^%]/.test(value);
      expr = isOperatorStart ? resultEl.textContent : '';
      justEvaluated = false;
    }
    expr += value;
    render();
  }

  function handleNumber(n) {
    appendToExpr(n);
  }

  function handleDecimal() {
    // Prevent multiple decimals in the current number segment
    const segment = expr.split(/[+\-*/^%()]/).pop();
    if (segment.includes('.')) return;
    appendToExpr(expr.length === 0 || /[+\-*/^%(]$/.test(expr) ? '0.' : '.');
  }

  function handleOperator(op) {
    if (expr === '' && op !== '-') return; // avoid leading operator except minus
    appendToExpr(op);
  }

  function handleClear() {
    expr = '';
    justEvaluated = false;
    render();
    showResult('0');
  }

  function handleBackspace() {
    if (justEvaluated) { handleClear(); return; }
    expr = expr.slice(0, -1);
    render();
  }

  function handleEquals() {
    if (!expr) return;
    try {
      const value = evaluate(expr);
      const formatted = formatNumber(value);
      showResult(formatted);
      pushHistory(expr, formatted);
      expr = formatted;
      justEvaluated = true;
      render();
    } catch (err) {
      showResult(errorMessage(err), true);
      justEvaluated = true;
      expr = '';
    }
  }

  function handlePercent() {
    appendToExpr('%');
  }

  // ---------- Scientific insertions ----------
  function insertFunc(name) {
    if (justEvaluated) { expr = ''; justEvaluated = false; }
    expr += name + '(';
    render();
  }

  function handleSciAction(action) {
    switch (action) {
      case 'sin': insertFunc('sin'); break;
      case 'cos': insertFunc('cos'); break;
      case 'tan': insertFunc('tan'); break;
      case 'log': insertFunc('log'); break;
      case 'ln': insertFunc('ln'); break;
      case 'sqrt': insertFunc('sqrt'); break;
      case 'paren-open': appendToExpr('('); break;
      case 'paren-close': appendToExpr(')'); break;
      case 'pow': appendToExpr('^'); break;
      case 'pi': appendToExpr('pi'); break;
      case 'e': appendToExpr('e'); break;
      case 'fact': appendToExpr('!'); break;
      case 'square': appendToExpr('^2'); break;
      case 'exp': appendToExpr('*10^'); break;
      case 'inv': {
        if (!expr) return;
        try {
          const value = evaluate(expr);
          if (value === 0) throw new Error('DIV0');
          const formatted = formatNumber(1 / value);
          expr = formatted;
          justEvaluated = false;
          render();
          showResult(formatted);
        } catch (err) {
          showResult(errorMessage(err), true);
        }
        break;
      }
    }
  }

  // ---------- Memory ----------
  function currentDisplayValue() {
    try { return evaluate(expr || resultEl.textContent); }
    catch { return NaN; }
  }

  function handleMemory(action) {
    switch (action) {
      case 'mc':
        memoryValue = 0; hasMemory = false; break;
      case 'mr':
        expr = formatNumber(memoryValue);
        justEvaluated = false;
        break;
      case 'mplus': {
        const v = currentDisplayValue();
        if (!isNaN(v)) { memoryValue += v; hasMemory = true; }
        break;
      }
      case 'mminus': {
        const v = currentDisplayValue();
        if (!isNaN(v)) { memoryValue -= v; hasMemory = true; }
        break;
      }
      case 'history':
        openHistoryPanel();
        return;
    }
    render();
  }

  // ---------- Button wiring ----------
  document.querySelectorAll('[data-num]').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = btn.dataset.num;
      if (btn.dataset.action === 'decimal') return; // handled below
      handleNumber(num);
    });
  });

  document.querySelectorAll('.key').forEach(btn => {
    const action = btn.dataset.action;
    if (!action) return;
    btn.addEventListener('click', () => {
      switch (action) {
        case 'clear': handleClear(); break;
        case 'backspace': handleBackspace(); break;
        case 'percent': handlePercent(); break;
        case 'decimal': handleDecimal(); break;
        case 'equals': handleEquals(); break;
        case 'add': handleOperator('+'); break;
        case 'subtract': handleOperator('-'); break;
        case 'multiply': handleOperator('*'); break;
        case 'divide': handleOperator('/'); break;
        case 'mc': case 'mr': case 'mplus': case 'mminus': case 'history':
          handleMemory(action); break;
        default:
          handleSciAction(action);
      }
    });
  });

  // ---------- Keyboard support ----------
  window.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key)) { handleNumber(e.key); return; }
    switch (e.key) {
      case '.': handleDecimal(); break;
      case '+': handleOperator('+'); break;
      case '-': handleOperator('-'); break;
      case '*': handleOperator('*'); break;
      case '/': e.preventDefault(); handleOperator('/'); break;
      case '^': handleOperator('^'); break;
      case '%': handlePercent(); break;
      case '(': appendToExpr('('); break;
      case ')': appendToExpr(')'); break;
      case 'Enter': case '=': e.preventDefault(); handleEquals(); break;
      case 'Backspace': handleBackspace(); break;
      case 'Escape': handleClear(); break;
      default: break;
    }
  });

  // ---------- Mode switch (Standard / Scientific) ----------
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const isSci = btn.dataset.mode === 'scientific';
      sciGrid.hidden = !isSci;
      document.body.dataset.scimode = String(isSci);
    });
  });

  // ---------- Theme toggle ----------
  themeToggle.addEventListener('click', () => {
    const current = document.body.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    themeToggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });

  // ---------- Init ----------
  render();
  renderHistory();
})();
