import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, AlertTriangle } from 'lucide-react';
import heroImage from '@/assets/hero-rescue.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Emergency responders coordinating rescue operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Integrated Disaster Management Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Punjab Sewa
            <span className="block text-3xl md:text-4xl font-normal text-white/90 mt-4">
              Coordinating Crisis Response
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive disaster management platform integrating incident reporting, 
            resource coordination, and emergency response for effective crisis management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-warning" />
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Emergency Response</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-success" />
              <div className="text-3xl font-bold mb-2">Real-Time</div>
              <div className="text-white/80">Coordination</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Shield className="h-8 w-8 mx-auto mb-3 text-primary-foreground" />
              <div className="text-3xl font-bold mb-2">Integrated</div>
              <div className="text-white/80">Management</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;