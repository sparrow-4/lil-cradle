export const SITE_CONTENT = {
  heroBanners: [
    {
      id: 1,
      tagline: 'Kerala\'s Premium Baby Store',
      headline: 'Celebrate Newborn <br/> Magic with Style',
      buttonText: 'Shop New Collections',
      buttonLink: '/shop',
      image: '/images/bg.png',
      bgColor: '#b89c84' 
    },
    {
      id: 2,
      tagline: 'Cradle Ceremony Kits',
      headline: 'Everything for your <br/> special ceremony!',
      buttonText: 'Explore Kits',
      buttonLink: '/shop?category=kits',
      image: '/images/img1.png',
      bgColor: '#0F83B2' 
    },
    {
      id: 3,
      tagline: 'Bespoke Hampers',
      headline: 'Customized Gifts <br/> for Little Joy.',
      buttonText: 'View Hampers',
      buttonLink: '/shop?category=hampers',
      image: '/images/p1.jpg',
      bgColor: '#EAF6FB' 
    }
  ],

  categories: [
    { name: 'Cradle Kits', image: '/images/b1.png', link: '/shop?category=kits' },
    { name: 'Baby Hampers', image: '/images/img1.png', link: '/shop?category=hampers' },
    { name: 'Ceremony Kit', image: '/images/bg.png', link: '/shop?category=ceremony' },
    { name: 'Essentials', image: '/images/p1.jpg', link: '/shop?category=essentials' },
    { name: 'Custom Gifts', image: '/images/img1.png', link: '/shop?category=custom' }
  ],

  promoBanners: [
    {
      id: 1,
      tag: 'New Arrivals',
      tagColor: '#0F83B2',
      headline: 'Traditional <br/> Cradle Kits',
      headlineHoverColor: '#0F83B2',
      buttonText: 'Shop Now',
      buttonBg: '#0F83B2',
      image: '/images/p1.jpg',
      bgColor: '#EAF6FB'
    },
    {
      id: 2,
      tag: 'Customizable',
      tagColor: '#b89c84',
      headline: 'Handmade <br/> Luxury Hampers',
      headlineHoverColor: '#b89c84',
      buttonText: 'Customize Now',
      buttonBg: '#b89c84',
      image: '/images/img1.png',
      bgColor: '#f5e6d8'
    }
  ],

  features: [
    { id: 1, title: 'Premium Quality', sub: 'Handpicked for your baby', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' },
    { id: 2, title: 'Kerala Wide Delivery', sub: 'Fast & Secure shipping', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>' },
    { id: 3, title: 'Bespoke Gifts', sub: 'Fully customizable hampers', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>' },
    { id: 4, title: 'Expert Support', sub: 'Available via WhatsApp', iconSvg: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>' }
  ],

  blogPosts: [
    { id: 1, title: 'Essential Checklist for Your Baby\'s Noolukettu (Cradle Ceremony)', desc: 'Planning a traditional naming ceremony in Kerala? Here is everything you need from cradle kits to traditional wear...', date: 'April 12, 2026', category: 'CEREMONY', catColor: '#0F83B2', image: '/images/bg.png', bg: '#f1f1f1' },
    { id: 2, title: 'How to Choose the Perfect Newborn Hamper for Gifting', desc: 'Customized hampers are the heart of gifting. Learn how to mix essentials with emotional keepsakes...', date: 'March 28, 2026', category: 'GIFTING', catColor: '#b89c84', image: '/images/p1.jpg', bg: '#f8f9fa' },
    { id: 3, title: 'Premium vs Traditional: Styles of Cradle Ceremony Kits', desc: 'Whether you prefer a modern aesthetic or a completely traditional vibe, we have you covered...', date: 'Feb 15, 2026', category: 'GUIDE', catColor: '#0F83B2', image: '/images/img1.png', bg: '#EAF6FB' },
  ],

  companyInfo: {
    name: 'Lil Cradle',
    addressLine1: 'Main Road, Near Metro Pillar',
    addressLine2: 'Kochi, Kerala 682025',
    email: 'info@lilcradle.com',
    phone: '+91 79028 05012',
    whatsapp: '917902805012',
    hoursLine1: 'Monday - Saturday: 9:30am - 7:30pm',
    hoursLine2: 'Sunday: 10:00am - 4:00pm',
    description: 'Specializing in premium newborn essentials, bespoke baby hampers, and traditional cradle ceremony kits across Kerala.',
    copyright: '© 2026 Lil Cradle. All rights reserved.'
  }
};
