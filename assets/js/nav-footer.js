/* Shared site header and footer, injected on every page.
   The active nav item is read from body[data-active]. */

(function () {
  var NAV_ITEMS = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { label: 'About', children: [
        { key: 'about', label: 'About NHS', href: 'about.html' },
        { key: 'bylaws', label: 'By-Laws', href: 'bylaws.html' },
      ] },
    { key: 'volunteer', label: 'Volunteer', href: 'volunteer.html' },
    { label: 'Membership', children: [
        { key: 'before-membership', label: 'Before Membership', href: 'before-membership.html' },
        { key: 'membership', label: 'Current Membership', href: 'membership.html' },
      ] },
    { key: 'meetings', label: 'Meetings', href: 'meetings.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  function renderHeader(active) {
    var links = NAV_ITEMS.map(function (item, i) {
      if (item.children) {
        var selfActive = item.key === active;
        var childActive = item.children.some(function (c) { return c.key === active; });
        var triggerActive = selfActive || childActive;
        var panelId = 'nav-dropdown-panel-' + i;
        var items = item.children.map(function (c) {
          var itemCls = 'nav-dropdown__item' + (c.key === active ? ' nav-dropdown__item--active' : '');
          return '<a class="' + itemCls + '" href="' + c.href + '">' + c.label + '</a>';
        }).join('');
        var triggerCls = 'nav-links__link nav-dropdown__trigger' + (triggerActive ? ' nav-links__link--active' : '');
        var triggerInner = item.label +
          '<svg class="nav-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
        var trigger = '<button type="button" class="' + triggerCls + '" aria-expanded="false" aria-controls="' + panelId + '">' + triggerInner + '</button>';
        return (
          '<div class="nav-dropdown">' +
            trigger +
            '<div class="nav-dropdown__panel" id="' + panelId + '">' + items + '</div>' +
          '</div>'
        );
      }
      var cls = 'nav-links__link' + (item.key === active ? ' nav-links__link--active' : '');
      return '<a class="' + cls + '" href="' + item.href + '">' + item.label + '</a>';
    }).join('');

    return (
      '<header class="site-header">' +
        '<div class="site-header__inner">' +
          '<a class="brand" href="index.html">' +
            '<img class="logo logo--nav" src="assets/images/nhs-logo.png" alt="National Honor Society logo">' +
            '<div class="brand__word">' +
              '<span class="brand__name">Laney NHS</span>' +
              '<span class="brand__sub">Buccaneer Chapter</span>' +
            '</div>' +
          '</a>' +
          '<button class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          '</button>' +
          '<nav class="nav-links" id="nav-links">' + links + '</nav>' +
        '</div>' +
      '</header>'
    );
  }

  function renderFooter() {
    return (
      '<footer class="site-footer">' +
        '<div class="site-footer__grid">' +
          '<div>' +
            '<div class="site-footer__brand-row">' +
              '<img class="logo logo--footer" src="assets/images/nhs-logo.png" alt="National Honor Society logo">' +
              '<span class="site-footer__brand-name">Laney NHS</span>' +
            '</div>' +
            '<p class="site-footer__blurb">Buccaneer Chapter of the National Honor Society, recognizing scholarship, service, leadership, and character.</p>' +
          '</div>' +
          '<div>' +
            '<div class="site-footer__heading">Resources</div>' +
            '<div class="site-footer__links">' +
              '<a href="index.html">Home</a>' +
              '<a href="about.html">About NHS</a>' +
              '<a href="bylaws.html">By-Laws</a>' +
              '<a href="volunteer.html">Volunteer</a>' +
              '<a href="before-membership.html">Before Membership</a>' +
              '<a href="membership.html">Current Membership</a>' +
              '<a href="meetings.html">Meetings</a>' +
              '<a href="contact.html">Contact</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="site-footer__heading">Quick Links</div>' +
            '<div class="site-footer__links">' +
              '<a href="https://docs.google.com/document/d/11HQhjEnb9GXXi5f8xGJ4nX1GZtjnt0so/edit?usp=sharing&amp;ouid=113870391324682496045&amp;rtpof=true&amp;sd=true" target="_blank" rel="noopener noreferrer">Pre-Approval Form</a>' +
              '<a href="https://www.instagram.com/laneynhs/" target="_blank" rel="noopener noreferrer">Instagram</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="site-footer__heading">Advisers</div>' +
            '<p class="site-footer__advisers">Ms. Jones<br><span>tonya.jones@nhcs.net</span><br><br>Ms. Woodbury<br><span>cherry.woodbury@nhcs.net</span></p>' +
          '</div>' +
        '</div>' +
        '<div class="site-footer__bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + ' Laney National Honor Society, Buccaneer Chapter.</span>' +
          '<span>Scholarship &middot; Service &middot; Leadership &middot; Character</span>' +
        '</div>' +
      '</footer>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var active = document.body.getAttribute('data-active') || '';
    var headerMount = document.getElementById('site-header');
    var footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.outerHTML = renderHeader(active);
    if (footerMount) footerMount.outerHTML = renderFooter();

    var toggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    var dropdowns = navLinks ? navLinks.querySelectorAll('.nav-dropdown') : [];

    function closeDropdowns() {
      dropdowns.forEach(function (d) {
        d.classList.remove('is-open');
        var t = d.querySelector('.nav-dropdown__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    if (toggle && navLinks) {
      toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (!isOpen) closeDropdowns();
      });
      navLinks.addEventListener('click', function (e) {
        var trigger = e.target.closest('.nav-dropdown__trigger');
        if (trigger) {
          var dropdown = trigger.closest('.nav-dropdown');
          var isOpen = dropdown.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          return;
        }
        if (e.target.tagName === 'A') {
          navLinks.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          closeDropdowns();
        }
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
          navLinks.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          closeDropdowns();
        }
      });
    }
  });
})();
