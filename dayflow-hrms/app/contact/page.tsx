"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, ArrowLeft, Send, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const templateParams = {
        from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        from_email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        company: formData.get('company') || 'Not provided',
        subject: formData.get('subject'),
        message: formData.get('message'),
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )

      // Reset form
      ;(e.target as HTMLFormElement).reset()
      
      // Show success popup
      setShowSuccessDialog(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary transition-colors">
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" name="company" placeholder="Acme Inc." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" name="subject" placeholder="How can we help?" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..." 
                        rows={6}
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out to us through any of these channels. We're here to help!
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Email</CardTitle>
                          <CardDescription className="mt-2">
                            <a href="mailto:support@dayflow-hrms.com" className="hover:text-primary transition-colors">
                              support@dayflow-hrms.com
                            </a>
                            <br />
                            <a href="mailto:sales@dayflow-hrms.com" className="hover:text-primary transition-colors">
                              sales@dayflow-hrms.com
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Phone</CardTitle>
                          <CardDescription className="mt-2">
                            <a href="tel:+1-555-123-4567" className="hover:text-primary transition-colors">
                              +1 (555) 123-4567
                            </a>
                            <br />
                            <span className="text-xs">Mon-Fri 9am-6pm EST</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Office</CardTitle>
                          <CardDescription className="mt-2">
                            123 Business Street<br />
                            Suite 100<br />
                            San Francisco, CA 94105<br />
                            United States
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                {/* Office Hours */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>Office Hours</CardTitle>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium">Closed</span>
                        </div>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>How quickly will I get a response?</CardTitle>
                    <CardDescription className="mt-2">
                      We typically respond to all inquiries within 24 hours during business days. 
                      For urgent matters, please call us directly.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you offer product demos?</CardTitle>
                    <CardDescription className="mt-2">
                      Yes! We offer personalized product demos tailored to your business needs. 
                      Contact us to schedule a demo at your convenience.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What support options are available?</CardTitle>
                    <CardDescription className="mt-2">
                      We offer email support, phone support, and live chat for all customers. 
                      Enterprise customers also get dedicated account management.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Can I request a custom feature?</CardTitle>
                    <CardDescription className="mt-2">
                      Absolutely! We're always looking to improve our platform based on customer 
                      feedback. Let us know what features you need, and we'll discuss the possibilities.
                    </CardDescription>
                  </CardHeader>
                </Card>
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

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl">Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Thank you for reaching out to us. We've received your message and will get back to you as soon as possible, typically within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
