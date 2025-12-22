# E-Commerce Web Application Design Guidelines

## Design Approach
**Reference-Based: Modern E-Commerce** - Drawing inspiration from Shopify, Etsy, and contemporary minimalist online stores that balance product focus with clean interfaces.

## Core Design Principles
1. **Product-First**: Visual hierarchy emphasizes product imagery and clear pricing
2. **Scannable Layouts**: Grid-based organization for easy browsing
3. **Trust & Clarity**: Clean typography and generous whitespace build confidence
4. **Frictionless Flow**: Seamless navigation from discovery to cart

---

## Typography System

**Font Stack**: Inter or similar modern sans-serif via Google Fonts

**Hierarchy**:
- **Product Titles**: text-lg to text-xl, font-semibold
- **Prices**: text-2xl font-bold (prominent, immediate visibility)
- **Descriptions**: text-sm to text-base, leading-relaxed for readability
- **Navigation/Labels**: text-sm font-medium, uppercase tracking for categories
- **Cart Totals**: text-3xl font-bold for final price emphasis

---

## Layout System

**Spacing Primitives**: Tailwind units of **2, 4, 6, and 8** (p-4, gap-6, m-8, etc.)

**Container Strategy**:
- Max-width: `max-w-7xl` for main content areas
- Page padding: `px-4 md:px-8` for consistent edges
- Section spacing: `py-8 md:py-12` between major sections

**Grid Layouts**:
- Product Catalog: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Cart Items: Single column stack with clear separation (gap-4)

---

## Component Library

### Navigation Header
- Sticky position with border-bottom
- Logo/brand on left, cart icon with badge on right
- Search bar centered (desktop) or expandable (mobile)
- Height: h-16, horizontal padding px-6

### Product Card (Catalog)
- Aspect ratio 4:3 or 1:1 for product images
- Padding: p-4 around content
- Image: rounded-lg, object-cover
- Title truncation after 2 lines
- Price positioned prominently below title
- Subtle border or shadow (ring-1 ring-gray-200 or shadow-sm)
- Hover: subtle scale transform (scale-105 on image)

### Product Details Page
- Two-column layout (md: and up): image gallery left, details right
- Image: Large display (min-h-96), rounded-lg
- Content section: max-w-md for text readability
- Add to Cart button: Large, full-width on mobile, prominent on desktop (px-8 py-3)
- Spacing between details sections: space-y-6

### Shopping Cart
- **Cart Page Layout**: Two-column on desktop (items left 2/3, summary right 1/3)
- **Cart Items**: Horizontal layout with thumbnail (w-20 h-20), title/price center, quantity controls right
- **Quantity Controls**: Inline buttons (-/+) with number display between
- **Cart Summary**: Sticky on desktop, fixed floating card with shadow-lg
- **Empty State**: Centered message with "Continue Shopping" CTA

### Buttons & CTAs
- **Primary (Add to Cart, Checkout)**: px-6 py-3, rounded-lg, font-semibold
- **Secondary (Back, Remove)**: px-4 py-2, text-sm
- **Icon Buttons**: p-2, rounded-full for quantity controls

### Filters/Categories
- Horizontal scroll on mobile, inline buttons on desktop
- Pill-style buttons: px-4 py-2, rounded-full
- Active state: distinct styling with ring or filled background
- Spacing: gap-2 between filter options

### Search Bar
- Rounded-full or rounded-lg
- Icon prefix (search icon)
- Placeholder: "Search products..."
- Width: Full on mobile, fixed max-w-md on desktop
- Padding: px-4 py-2

---

## Images

**Product Images Required**:
- **Catalog Cards**: Square or 4:3 ratio, minimum 400x400px
- **Product Details**: Larger hero image, 800x800px minimum, with optional thumbnail gallery
- **Cart Thumbnails**: Small square 80x80px
- **Empty States**: Illustrative icon or simple graphic for empty cart

**Image Treatment**:
- Consistent aspect ratios across catalog
- Object-fit: cover for maintaining aspect
- Rounded corners (rounded-lg) for modern feel
- Subtle hover effects on catalog (brightness or scale)

**No large hero section** - This is a functional e-commerce app, not a marketing page. Lead directly with product catalog.

---

## Page-Specific Layouts

### Catalog Page
- Optional category/filter bar at top (sticky)
- Product grid below with consistent spacing
- Responsive: 1 column mobile → 2 tablet → 3-4 desktop

### Product Details
- Breadcrumb navigation at top (text-sm)
- Gallery + details side-by-side (desktop)
- Stacked layout (mobile): image first, then details
- Related products section below (optional enhancement)

### Cart Page
- Cart items list with clear item separation
- Running subtotal always visible
- Checkout button prominent and sticky on mobile
- Empty cart state with clear CTA to return to catalog

---

## Responsive Breakpoints
- **Mobile-first**: Base styles optimized for mobile
- **md: (768px)**: 2-column grids, horizontal layouts
- **lg: (1024px)**: 3-4 column grids, side-by-side layouts
- **Navigation**: Hamburger menu mobile, full nav desktop

---

## Animations
**Minimal, purposeful only**:
- Product card hover: subtle scale (transition-transform duration-200)
- Add to Cart: Brief success feedback (optional checkmark animation)
- Cart badge: Pulse on item addition
- No scroll animations or unnecessary motion

---

This design creates a professional, conversion-focused e-commerce experience with clear visual hierarchy and intuitive user flows optimized for product discovery and purchase.