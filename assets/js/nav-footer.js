/* Shared site header and footer, injected on every page.
   The active nav item is read from body[data-active]. */

(function () {
  var NAV_ITEMS = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'volunteer', label: 'Volunteer', href: 'volunteer.html' },
    { key: 'membership', label: 'Membership', href: 'membership.html' },
    { key: 'meetings', label: 'Meetings', href: 'meetings.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  function renderHeader(active) {
    var links = NAV_ITEMS.map(function (item) {
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
              '<a href="about.html">About</a>' +
              '<a href="volunteer.html">Volunteer</a>' +
              '<a href="membership.html">Membership</a>' +
              '<a href="meetings.html">Meetings</a>' +
              '<a href="contact.html">Contact</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="site-footer__heading">Quick Links</div>' +
            '<div class="site-footer__links">' +
              '<a href="https://docs.google.com/document/d/1cUx2-V5nQm0JadVQ_3Qz4kexI_a5m37xxIAc1M7Jhzw/edit?tab=t.nqt0bi9y2y2f" target="_blank" rel="noopener noreferrer">Pre-Approval Form</a>' +
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
    if (toggle && navLinks) {
      toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          navLinks.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
          navLinks.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
})();
