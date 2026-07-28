import { useEffect, useRef } from 'react';

const ANIMATION_SELECTOR = '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right';

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    observerRef.current = observer;

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll(ANIMATION_SELECTOR).forEach((element) => observer.observe(element));
    };

    // Observe everything already on the page.
    observeWithin(document);

    // Sections like Events/Videos render their animated cards only after an
    // async fetch resolves, well after this effect's initial scan - without
    // this, those elements are never observed and stay stuck at opacity: 0.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(ANIMATION_SELECTOR)) observer.observe(node);
          observeWithin(node);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return observerRef;
};

export default useScrollAnimation;