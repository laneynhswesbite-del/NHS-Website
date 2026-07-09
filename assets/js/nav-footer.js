/* Shared site header and footer, injected on every page.
   The active nav item is read from body[data-active]. */

(function () {
  var NAV_ITEMS = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'volunteer', label: 'Volunteer', href: 'volunteer.html' },
    { key: 'membership', label: 'Membership', href: 'membership.html' },
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
          '<nav class="nav-links">' + links + '</nav>' +
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
            '<div class="site-footer__heading">Quick Links</div>' +
            '<div class="site-footer__links">' +
              '<a href="index.html">Home</a>' +
              '<a href="about.html">About</a>' +
              '<a href="volunteer.html">Volunteer</a>' +
              '<a href="membership.html">Membership</a>' +
              '<a href="contact.html">Contact</a>' +
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
  });
})();
