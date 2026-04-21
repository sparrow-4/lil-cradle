export const SITE_CONTENT = {
  heroBanners: [
    {
      id: 1,
      tagline: 'Welcome to Lil Cradle',
      headline: 'Play, learn, <br/> & grow!',
      buttonText: 'Shop now',
      buttonLink: '/shop',
      image: '/images/bg.png',
      bgColor: '#b89c84' // Taupe
    },
    {
      id: 2,
      tagline: 'New Arrivals',
      headline: 'Discover the <br/> Joy of Toys!',
      buttonText: 'Explore',
      buttonLink: '/shop',
      image: '/images/img1.png',
      bgColor: '#0F83B2' // Blue
    },
    {
      id: 3,
      tagline: 'Eco-Friendly',
      headline: 'Sustainable <br/> & Safe.',
      buttonText: 'See Collection',
      buttonLink: '/shop',
      image: '/images/p1.jpg',
      bgColor: '#EAF6FB' // Light Blue (adjusting text color needed if used)
    }
  ],

  categories: [
    { name: 'Baby Beds', image: '/images/b1.png', link: '/shop?category=beds' },
    { name: 'Cradle Sets', image: '/images/img1.png', link: '/shop?category=cradles' },
    { name: 'Accessories', image: '/images/bg.png', link: '/shop?category=accessories' },
    { name: 'Educational', image: '/images/p1.jpg', link: '/shop?category=educational' },
    { name: 'Soft Toys', image: '/images/img1.png', link: '/shop?category=soft' }
  ],

  promoBanners: [
    {
      id: 1,
      tag: 'New Collection',
      tagColor: '#0F83B2',
      headline: 'Discover the <br/> Joy of Play',
      headlineHoverColor: '#0F83B2',
      buttonText: 'Shop Now',
      buttonBg: '#0F83B2',
      image: '/images/p1.jpg',
      bgColor: '#EAF6FB'
    },
    {
      id: 2,
      tag: 'Sustainable',
      tagColor: '#b89c84',
      headline: 'Eco-friendly <br/> Wooden Toys',
      headlineHoverColor: '#b89c84',
      buttonText: 'Explore',
      buttonBg: '#b89c84',
      image: '/images/img1.png',
      bgColor: '#f5e6d8'
    }
  ],

  features: [
    { id: 1, title: 'Safe Toys', sub: '100% certified materials', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' },
    { id: 2, title: 'Free Delivery', sub: 'Orders over $50', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>' },
    { id: 3, title: 'Easy Returns', sub: '30 days return policy', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>' },
    { id: 4, title: '24/7 Support', sub: 'Always here for you', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>' }
  ],

  blogPosts: [
    { id: 1, title: 'Why sorting blocks matter for early childhood development', desc: 'Discover how simple shapes unlock the most foundational cognitive jumps in toddlers...', date: 'April 12, 2026', category: 'EDUCATIONAL', catColor: '#0F83B2', image: '/images/bg.png', bg: '#f1f1f1' },
    { id: 2, title: 'Designing the perfect eco-friendly nursery room', desc: 'Creating a calming and sustainable space for your baby doesn\'t have to be hard...', date: 'March 28, 2026', category: 'LIFESTYLE', catColor: '#b89c84', image: '/images/p1.jpg', bg: '#f8f9fa' },
    { id: 3, title: 'Understanding non-toxic paints and materials', desc: 'What to look for on the label before handing that new toy to your infant...', date: 'Feb 15, 2026', category: 'TOY SAFETY', catColor: '#0F83B2', image: '/images/img1.png', bg: '#EAF6FB' },
  ],

  companyInfo: {
    name: 'Lil Cradle Store',
    addressLine1: '123 Baby Avenue, Suite 100',
    addressLine2: 'New York, NY 10001',
    email: 'hello@lilcradle.com',
    phone: '+1 (555) 123-4567',
    whatsapp: '917902805012',
    hoursLine1: 'Monday - Friday: 9am - 8pm',
    hoursLine2: 'Saturday - Sunday: 10am - 6pm',
    description: 'Creating magical moments with premium, safe, and beautiful toys for your little ones.',
    copyright: '© 2026 Lil Cradle. All rights reserved.'
  }
};
