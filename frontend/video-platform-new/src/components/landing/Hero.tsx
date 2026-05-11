"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="section-padding pt-32 md:pt-40">
    <div className="container-narrow">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            Video Hosting and streaming platform built for{" "}
            <span className="text-gradient">your business</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Upload once. Transcode automatically & stream video in minutes. Secure delivery with fast playback across devices.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button size="lg" className="gap-2">
              Get started free <ArrowRight size={16} />
            </Button>
            {/* <Button size="lg" variant="outline">
              Book a demo
            </Button> */}
          </div>
          
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <Image
              src={dashboardMockup}
              alt="MediaCodex dashboard showing video upload progress, transcode jobs, output formats, and analytics"
              width={1280}
              height={800}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -z-10 inset-0 bg-accent rounded-3xl translate-x-4 translate-y-4" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
