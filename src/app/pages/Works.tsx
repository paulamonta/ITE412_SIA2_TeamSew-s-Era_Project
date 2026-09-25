import { useState } from "react";
import { Plus, ExternalLink, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  link?: string;
}

const initialWorks: Work[] = [
  {
    id: "1",
    title: "Creative Design Project",
    description: "A comprehensive brand identity design for a modern tech startup, including logo design, color palette, and brand guidelines.",
    category: "Design",
    date: "2026-03-15",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    link: "https://example.com/project1"
  },
  {
    id: "2",
    title: "Architectural Innovation",
    description: "Modern sustainable building design with focus on energy efficiency and aesthetic appeal.",
    category: "Architecture",
    date: "2026-02-20",
    imageUrl: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    link: "https://example.com/project2"
  },
  {
    id: "3",
    title: "Digital Innovation Platform",
    description: "Development of a cutting-edge digital platform leveraging AI and machine learning technologies.",
    category: "Technology",
    date: "2026-01-10",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    link: "https://example.com/project3"
  }
];

export function Works() {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    imageUrl: "",
    link: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingWork) {
      // Update existing work
      setWorks(works.map(work => 
        work.id === editingWork.id 
          ? { ...formData, id: work.id } 
          : work
      ));
    } else {
      // Add new work
      const newWork: Work = {
        ...formData,
        id: Date.now().toString()
      };
      setWorks([newWork, ...works]);
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      date: "",
      imageUrl: "",
      link: ""
    });
    setEditingWork(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setFormData(work);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this work?")) {
      setWorks(works.filter(work => work.id !== id));
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingWork(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      date: "",
      imageUrl: "",
      link: ""
    });
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">My Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of my professional projects, creative endeavors, and notable contributions
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingWork(null)}>
                <Plus size={18} />
                Add Work
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingWork ? "Edit Work" : "Add New Work"}</DialogTitle>
                <DialogDescription>
                  {editingWork ? "Update the details of your work" : "Fill in the details to add a new work to your portfolio"}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project Title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your work..."
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
                      placeholder="e.g., Design, Development"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Project Link (Optional)</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.com/project"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingWork ? "Update Work" : "Add Work"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Works Grid */}
        {works.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No works yet</h3>
            <p className="text-muted-foreground mb-6">Start building your portfolio by adding your first work</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add Your First Work</Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video overflow-hidden bg-muted relative">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEdit(work)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(work.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <CardTitle className="line-clamp-1">{work.title}</CardTitle>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap">
                      {work.category}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">{work.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      {new Date(work.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
