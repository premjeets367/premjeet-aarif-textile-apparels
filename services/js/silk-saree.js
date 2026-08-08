/* Silk Saree Manufacturing — page-specific script */
document.addEventListener('DOMContentLoaded', () => {
  // Stagger-reveal the manufacturing process steps for this service page
  const steps = document.querySelectorAll('.process-list li');
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity .5s ease, transform .5s ease';
        entry.target.style.transitionDelay = (i * 80) + 'ms';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateX(0)';
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(li => {
    li.style.opacity = 0;
    li.style.transform = 'translateX(-16px)';
    stepObserver.observe(li);
  });

  // Log page view for "Silk Saree Manufacturing" (placeholder for analytics hook)
  console.log('Viewing service page: Silk Saree Manufacturing');
});
