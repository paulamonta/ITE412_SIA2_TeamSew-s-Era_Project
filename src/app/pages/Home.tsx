import { Link } from "react-router";
import { ArrowRight, Briefcase, Award, Mail } from "lucide-react";
import { Button } from "../components/ui/button";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary to-background py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                Professional Portfolio
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to My
                <span className="text-primary block">Professional Space</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore my journey through professional accomplishments, creative works, 
                and industry recognition. A comprehensive showcase of expertise and dedication.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/works">
                  <Button size="lg" className="gap-2">
                    View My Works
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="gap-2">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted border-4 border-primary/20 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center">
                      <span className="text-6xl text-primary-foreground font-bold">P</span>
                    </div>
                    <p className="text-muted-foreground italic">Your Professional Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Explore My Portfolio</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the highlights of my professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/works" className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Briefcase className="text-primary group-hover:text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Works</h3>
                <p className="text-muted-foreground mb-4">
                  A curated collection of my professional projects and creative endeavors
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>Explore Works</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/awards" className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Award className="text-primary group-hover:text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Awards</h3>
                <p className="text-muted-foreground mb-4">
                  Recognition and achievements earned throughout my professional career
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>View Awards</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/contact" className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Mail className="text-primary group-hover:text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Contact</h3>
                <p className="text-muted-foreground mb-4">
                  Get in touch for collaborations, opportunities, or inquiries
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>Get In Touch</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">About This Portfolio</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            This portfolio represents years of dedication, continuous learning, and professional growth. 
            Each project and achievement showcased here reflects my commitment to excellence and 
            passion for my craft. I invite you to explore my work and discover how my skills and 
            experience can contribute to meaningful collaborations.
          </p>
          <Link to="/contact">
            <Button size="lg" className="gap-2">
              Let's Connect
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
