/* Loads a published-to-web Google Sheet (CSV) and renders it into a
   placeholder container. If the fetch fails, is empty, or the sheet only
   has a header row, the container's existing static placeholder markup
   is left untouched so the page never shows a broken or blank state. */

(function () {
  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else { inQuotes = false; }
        } else {
          field += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows.filter(function (r) { return r.some(function (f) { return f.trim() !== ''; }); });
  }

  window.escapeHtml = function (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  window.loadSheetTable = function (options) {
    var csvUrl = options.csvUrl;
    var container = document.getElementById(options.containerId);
    var renderRow = options.renderRow;
    if (!container) return;

    fetch(csvUrl, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('bad response');
        return res.text();
      })
      .then(function (text) {
        var rows = parseCsv(text);
        var dataRows = rows.slice(1); // drop header row
        if (!dataRows.length) return; // keep static placeholder

        var html = dataRows.map(function (fields) {
          return renderRow(fields.map(function (f) { return f.trim(); }));
        }).join('');

        if (html.trim()) container.innerHTML = html;
      })
      .catch(function () {
        /* Network hiccup, sheet unpublished, etc. — leave the static
           placeholder rows already in the page as-is. */
      });
  };
})();
