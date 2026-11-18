const marketHeader = document.querySelector('header:has(.market-navigation)');

if (marketHeader) {
  const syncStickyHeaderHeight = () => {
    const height = Math.ceil(marketHeader.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--sticky-header-height', `${height}px`);
  };

  syncStickyHeaderHeight();
  if ('ResizeObserver' in window) {
    new ResizeObserver(syncStickyHeaderHeight).observe(marketHeader);
  }

  const currentMarket = marketHeader.querySelector('[aria-current="page"]');
  if (currentMarket) {
    const row = currentMarket.parentElement;
    const rowBounds = row.getBoundingClientRect();
    const linkBounds = currentMarket.getBoundingClientRect();
    if (linkBounds.right > rowBounds.right) {
      row.scrollLeft += linkBounds.right - rowBounds.right;
    }
  }
}
