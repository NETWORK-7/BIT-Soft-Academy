"use client";

import { Users, Target, Lightbulb, Award, Github, Linkedin, Mail } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      id: 1,
      name: "Umedjon Burkhonov",
      role: "Founder & Lead Instructor",
      bio: "4+ years in web development with expertise in full-stack technologies",
      avatar: "👨‍💻",
      social: { github: "#", linkedin: "#", email: "ahmed@bitsoft.com" }
    },
    {
      id: 2,
      name: "Najmiddin Abdurahmonov",
      role: "Backend Developer & DevOps Engineer",
      bio: "Specializes in Node.js, Express.js, GO(Golang), ",
      avatar: "👨‍💻",
      social: { github: "#", linkedin: "#", email: "najmiddinme@gmail.com" }
    },
    {
      id: 3,
      name: "Muhammadali Saidov",
      role: "Mobile Developer",
      bio: "React Native and modern CSS frameworks",
      avatar: "👨‍💼",
      social: { github: "#", linkedin: "#", email: "youssef@bitsoft.com" }
    },
    {
      id: 4,
      name: "Daler Sodiqov",
      role: "Backend Developer",
      bio: "Creates engaging learning materials and curriculum design",
      avatar: "👨‍💻",
      social: { github: "#", linkedin: "#", email: "dalerjonsodikov27@gmail.com" }
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Quality Learning",
      description: "We provide industry-standard, up-to-date content taught by experienced professionals"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always staying ahead of the curve with the latest technologies and best practices"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community where learners can collaborate and grow together"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional educational experiences and outcomes"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-linear-to-r from-brand-from to-brand-to text-primary-foreground py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Bit-Soft IT Academy</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering the next generation of developers through quality education, hands-on learning, and industry expertise
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              At Bit-Soft IT Academy, our mission is to democratize access to quality tech education and help aspiring developers master modern web development skills.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We believe that everyone has the potential to become a great developer. Our comprehensive courses combine theoretical knowledge with practical, real-world projects to ensure our students are job-ready upon completion.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since our founding, we've helped thousands of students transition into tech careers and advance their professional growth.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-2xl font-bold text-gray-900 mb-2">5000+</p>
            <p className="text-gray-600 text-lg mb-6">Students Trained</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">500+</p>
            <p className="text-gray-600 text-lg mb-6">Job Placements</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">95%</p>
            <p className="text-gray-600 text-lg">Satisfaction Rate</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                  <Icon className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a href={member.social.github} className="text-gray-400 hover:text-purple-600 transition">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-purple-600 transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-purple-600 transition">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>  
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-brand-from to-brand-to rounded-2xl p-12 text-primary-foreground text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of students who have already transformed their careers</p>
          <a
            href="/courses"
            className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </div>
  );
}
