import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import { AlertTriangle, Heart, LogIn } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Hero />
      <Features />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Experience the power of integrated disaster management
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="h-12 px-8"
            >
              <Link to="/login">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In / Register
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 border-primary-foreground text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/report">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Emergency
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 border-primary-foreground text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
