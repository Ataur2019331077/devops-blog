import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cloud, 
  Container, 
  Shield, 
  Server, 
  GitBranch, 
  Cpu, 
  Menu, 
  X, 
  ChevronRight, 
  Calendar, 
  Clock, 
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Search,
  Zap,
  type LucideIcon
} from 'lucide-react';

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  icon: LucideIcon;  // Changed from React.ReactNode to LucideIcon type
  tags: string[];
}

interface NavItem {
  label: string;
  href: string;
}

// Static Blog Data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Kubernetes Best Practices for Production Environments",
    excerpt: "Learn how to optimize your K8s clusters for high availability, security, and performance at scale.",
    content: "Kubernetes has become the de facto standard for container orchestration...",
    category: "Orchestration",
    readTime: "8 min read",
    date: "Feb 12, 2024",
    icon: Container,  // Pass the component itself, not JSX
    tags: ["Kubernetes", "Docker", "DevOps"]
  },
  {
    id: 2,
    title: "Infrastructure as Code with Terraform & AWS",
    excerpt: "Master the art of declarative infrastructure management using Terraform modules and AWS best practices.",
    content: "Infrastructure as Code (IaC) revolutionizes how we manage cloud resources...",
    category: "IaC",
    readTime: "12 min read",
    date: "Feb 10, 2024",
    icon: Cloud,
    tags: ["Terraform", "AWS", "Cloud"]
  },
  {
    id: 3,
    title: "CI/CD Pipeline Security: DevSecOps Guide",
    excerpt: "Integrate security scanning into your pipelines without compromising delivery speed.",
    content: "Security shouldn't be an afterthought in your delivery pipeline...",
    category: "Security",
    readTime: "10 min read",
    date: "Feb 8, 2024",
    icon: Shield,
    tags: ["DevSecOps", "CI/CD", "Security"]
  },
  {
    id: 4,
    title: "GitOps with ArgoCD: Declarative Continuous Delivery",
    excerpt: "Implement GitOps workflows using ArgoCD for automated, auditable deployments.",
    content: "GitOps uses Git as the single source of truth for declarative infrastructure...",
    category: "GitOps",
    readTime: "15 min read",
    date: "Feb 5, 2024",
    icon: GitBranch,
    tags: ["GitOps", "ArgoCD", "Kubernetes"]
  },
  {
    id: 5,
    title: "Observability: Beyond Monitoring with Prometheus & Grafana",
    excerpt: "Build comprehensive observability stacks covering metrics, logs, and distributed tracing.",
    content: "Modern systems require more than just monitoring—they need observability...",
    category: "Observability",
    readTime: "11 min read",
    date: "Feb 2, 2024",
    icon: Server,
    tags: ["Monitoring", "Prometheus", "SRE"]
  },
  {
    id: 6,
    title: "Serverless Architecture Patterns",
    excerpt: "Design scalable, cost-effective applications using AWS Lambda and event-driven architecture.",
    content: "Serverless computing abstracts infrastructure management...",
    category: "Serverless",
    readTime: "9 min read",
    date: "Jan 28, 2024",
    icon: Zap,
    tags: ["Lambda", "AWS", "Architecture"]
  }
];

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Articles', href: '#articles' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
];

interface Category {
  name: string;
  count: number;
  icon: LucideIcon;
}

const categories: Category[] = [
  { name: "Kubernetes", count: 12, icon: Container },
  { name: "CI/CD", count: 8, icon: GitBranch },
  { name: "Security", count: 6, icon: Shield },
  { name: "Cloud", count: 15, icon: Cloud },
  { name: "IaC", count: 9, icon: Terminal },
  { name: "Monitoring", count: 7, icon: Cpu },
];

// Components
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              DevOpsHub
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-500/20 transition-all">
              Subscribe
            </button>
          </div>

          <button 
            className="md:hidden text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 text-cyan-400 text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Latest in DevOps & Cloud Native
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Master Modern{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Infrastructure
          </span>
          <br />
          & Automation
        </h1>

        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deep dives into Kubernetes, CI/CD pipelines, Infrastructure as Code, and Cloud Native technologies. 
          Level up your DevOps skills with production-ready guides.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2">
            Explore Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full font-semibold hover:bg-slate-800 transition-all">
            View Categories
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { label: 'Articles', value: '50+' },
            { label: 'Categories', value: '12' },
            { label: 'Readers', value: '10k+' },
            { label: 'Authors', value: '8' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPost: React.FC<{ post: BlogPost }> = ({ post }) => {
  const IconComponent = post.icon;
  
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <IconComponent className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20">
                Featured
              </span>
              <span className="text-slate-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <button className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const IconComponent = post.icon;
  
  return (
    <article className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300">
          <IconComponent className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-500">{post.date}</span>
          <button className="text-cyan-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const IconComponent = category.icon;
  
  return (
    <div className="group bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="text-slate-500 text-sm">{category.count} posts</span>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
        {category.name}
      </h3>
    </div>
  );
};

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Ahead in DevOps
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Get weekly insights on Kubernetes, CI/CD, and Cloud Native technologies delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-slate-950 border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="mt-4 text-xs text-slate-600">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">DevOpsHub</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your premier destination for DevOps tutorials, best practices, and cloud-native insights. Building the future of infrastructure, one article at a time.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Articles', 'Categories', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Topics</h4>
            <ul className="space-y-2">
              {['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2024 DevOpsHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Featured Article</h2>
            <p className="text-slate-400">Hand-picked deep dive for this week</p>
          </div>
          <FeaturedPost post={blogPosts[0]} />
        </section>

        <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
              <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.name} category={cat} />
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Articles</h2>
              <p className="text-slate-400">Explore our collection of DevOps guides</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 w-full md:w-64"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No articles found matching your criteria.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-full font-medium hover:bg-slate-800 hover:text-white transition-all">
              Load More Articles
            </button>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default App;