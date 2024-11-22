import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function WhoAmI() {
  return (
    <div className="space-y-8">
      <section className="flex items-center gap-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold mb-2">John Developer</h1>
          <p className="text-xl text-muted-foreground">
            Full Stack Developer & Game Enthusiast
          </p>
        </div>
      </section>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          Passionate developer with expertise in modern web technologies and a love
          for creating interactive experiences. Focused on building elegant,
          user-centric solutions that make a difference.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <ul className="space-y-2">
            <li>• Frontend: React, TypeScript, Tailwind CSS</li>
            <li>• Backend: Node.js, Express, PostgreSQL</li>
            <li>• Tools: Git, Docker, AWS</li>
            <li>• Game Development: Unity, Canvas API</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Senior Developer - Tech Corp</h3>
              <p className="text-sm text-muted-foreground">2020 - Present</p>
            </div>
            <div>
              <h3 className="font-medium">Full Stack Developer - Web Studios</h3>
              <p className="text-sm text-muted-foreground">2018 - 2020</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
