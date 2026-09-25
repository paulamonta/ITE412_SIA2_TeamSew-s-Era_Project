import { useState } from "react";
import { Plus, Trophy, Medal, Star, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

interface Award {
  id: string;
  title: string;
  organization: string;
  description: string;
  date: string;
  category: string;
}

const initialAwards: Award[] = [
  {
    id: "1",
    title: "Excellence in Innovation Award",
    organization: "International Design Association",
    description: "Recognized for outstanding contribution to innovative design solutions and creative problem-solving in the digital space.",
    date: "2026-03-01",
    category: "Innovation"
  },
  {
    id: "2",
    title: "Best Professional Portfolio",
    organization: "Creative Professionals Network",
    description: "Awarded for maintaining an exceptional professional portfolio showcasing diverse skills and achievements.",
    date: "2025-11-15",
    category: "Portfolio"
  },
  {
    id: "3",
    title: "Leadership Excellence Certificate",
    organization: "Global Leadership Institute",
    description: "Certified for demonstrating exceptional leadership qualities and mentoring capabilities in professional settings.",
    date: "2025-08-20",
    category: "Leadership"
  },
  {
    id: "4",
    title: "Outstanding Achievement Award",
    organization: "Professional Excellence Society",
    description: "Honored for consistent high-quality work and significant contributions to the professional community.",
    date: "2025-05-10",
    category: "Achievement"
  }
];

const categoryIcons = {
  Innovation: Star,
  Portfolio: Trophy,
  Leadership: Medal,
  Achievement: Trophy,
  default: Trophy
};

export function Awards() {
  const [awards, setAwards] = useState<Award[]>(initialAwards);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    date: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAward) {
      // Update existing award
      setAwards(awards.map(award => 
        award.id === editingAward.id 
          ? { ...formData, id: award.id } 
          : award
      ));
    } else {
      // Add new award
      const newAward: Award = {
        ...formData,
        id: Date.now().toString()
      };
      setAwards([newAward, ...awards]);
    }

    // Reset form
    setFormData({
      title: "",
      organization: "",
      description: "",
      date: "",
      category: ""
    });
    setEditingAward(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (award: Award) => {
    setEditingAward(award);
    setFormData(award);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this award?")) {
      setAwards(awards.filter(award => award.id !== id));
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingAward(null);
    setFormData({
      title: "",
      organization: "",
      description: "",
      date: "",
      category: ""
    });
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default;
    return IconComponent;
  };

  // Sort awards by date (newest first)
  const sortedAwards = [...awards].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Awards & Recognition</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Honors and achievements earned throughout my professional journey
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingAward(null)}>
                <Plus size={18} />
                Add Award
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAward ? "Edit Award" : "Add New Award"}</DialogTitle>
                <DialogDescription>
                  {editingAward ? "Update the details of your award" : "Fill in the details to add a new award to your collection"}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Award Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Excellence in Innovation Award"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Awarding Organization"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the award and why it was given..."
                    rows={4}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Innovation, Leadership"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date Awarded *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingAward ? "Update Award" : "Add Award"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Awards List */}
        {awards.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No awards yet</h3>
            <p className="text-muted-foreground mb-6">Start documenting your achievements by adding your first award</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add Your First Award</Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedAwards.map((award) => {
              const IconComponent = getCategoryIcon(award.category);
              return (
                <Card key={award.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <IconComponent className="text-primary group-hover:text-primary-foreground" size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <CardTitle className="text-xl">{award.title}</CardTitle>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleEdit(award)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                              onClick={() => handleDelete(award.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-muted-foreground">{award.organization}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {new Date(award.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                          <Badge variant="secondary">{award.category}</Badge>
                        </div>
                        <CardDescription className="text-base">{award.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}

        {/* Stats Section */}
        {awards.length > 0 && (
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{awards.length}</div>
                  <div className="text-muted-foreground">Total Awards</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {new Set(awards.map(a => a.category)).size}
                  </div>
                  <div className="text-muted-foreground">Categories</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {new Set(awards.map(a => a.organization)).size}
                  </div>
                  <div className="text-muted-foreground">Organizations</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
