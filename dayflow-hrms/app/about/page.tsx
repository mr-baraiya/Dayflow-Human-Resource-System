import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Zap, Heart, Globe, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={32} />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="sm">Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Back Button */}
        <div className="container px-4 pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                About Dayflow HRMS
              </h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to revolutionize HR management by making it simple, 
                efficient, and accessible for businesses of all sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                  <CardDescription className="text-base mt-4">
                    To empower organizations with intuitive HR technology that simplifies workforce 
                    management, enhances employee experience, and drives business growth. We believe 
                    that HR should be a strategic partner, not a bottleneck.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                  <CardDescription className="text-base mt-4">
                    To become the world's most trusted HR platform, where every employee interaction 
                    is seamless, every decision is data-driven, and every business can scale effortlessly 
                    with their people operations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
                Our Story
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground">
                  Dayflow HRMS was born from a simple observation: HR teams were spending too much 
                  time on administrative tasks and not enough time on strategic initiatives that 
                  truly matter—building culture, developing talent, and driving organizational success.
                </p>
                <p className="text-lg text-muted-foreground">
                  Founded in 2024, we set out to create an HR platform that combines powerful 
                  functionality with an intuitive user experience. Our team of HR professionals, 
                  software engineers, and UX designers came together to build a solution that 
                  addresses real-world challenges.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, Dayflow HRMS serves hundreds of companies worldwide, managing thousands of 
                  employees and processing millions of HR transactions. But we're just getting started. 
                  We continue to innovate and evolve our platform based on feedback from our customers 
                  and the changing needs of the modern workplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>People First</CardTitle>
                  <CardDescription>
                    We put people at the center of everything we do—our customers, their employees, 
                    and our team. Every feature is designed with the end user in mind.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Simplicity</CardTitle>
                  <CardDescription>
                    Complex problems deserve simple solutions. We believe great software should be 
                    powerful yet easy to use, removing friction at every step.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Innovation</CardTitle>
                  <CardDescription>
                    We're constantly pushing boundaries, exploring new technologies, and finding 
                    better ways to solve HR challenges in an ever-evolving workplace.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Reliability</CardTitle>
                  <CardDescription>
                    Your HR operations are critical to your business. We ensure our platform is 
                    secure, stable, and always available when you need it.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Agility</CardTitle>
                  <CardDescription>
                    We move fast, adapt quickly, and respond to our customers' needs. In a rapidly 
                    changing world, flexibility is key to success.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Integrity</CardTitle>
                  <CardDescription>
                    We operate with transparency, honesty, and ethical standards. Trust is the 
                    foundation of our relationships with customers and partners.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Companies</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Employees</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <p className="text-muted-foreground">Countries</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <p className="text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Join Us on This Journey
              </h2>
              <p className="text-lg opacity-90">
                Be part of the HR revolution. Let's build better workplaces together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo size={32} />
              <p className="text-sm text-muted-foreground">
                Modern HR management solution for businesses of all sizes
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/signup" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Dayflow HRMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
