"use client";

import { Users, Target, Lightbulb, Award, Github, Linkedin, Mail } from "lucide-react";
import { useLanguageContext } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguageContext();
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
      title: language === 'uz' ? 'Sifatli Ta\'lim' : language === 'ru' ? 'Качественное обучение' : language === 'tg' ? 'Та\'лими сифатдор' : 'Quality Learning',
      description: language === 'uz' ? 'Tajribali mutaxassislar tomonidan o\'qitilgan, sanoat standartidagi, zamonaviy kontent taqdim etamiz' : language === 'ru' ? 'Мы предоставляем контент отраслевых стандартов, актуальный, преподаваемый опытными профессионалами' : language === 'tg' ? 'Мо контенти стандарти санатро, нав ва аз тарафи касбониёни таълим медихем' : 'We provide industry-standard, up-to-date content taught by experienced professionals'
    },
    {
      icon: Lightbulb,
      title: language === 'uz' ? 'Innovatsiya' : language === 'ru' ? 'Инновации' : language === 'tg' ? 'Инноватсия' : 'Innovation',
      description: language === 'uz' ? 'Har doim eng so\'nggi texnologiyalar va eng yaxshi amaliyotlar bilan oldinda bo\'lish' : language === 'ru' ? 'Всегда оставаться впереди кривой с последними технологиями и лучшими практиками' : language === 'tg' ? 'Ҳамеша бо технологияхои нав ва амалиётхои беҳтарин пеш аз хат' : 'Always staying ahead of the curve with latest technologies and best practices'
    },
    {
      icon: Users,
      title: language === 'uz' ? 'Jamiyat' : language === 'ru' ? 'Сообщество' : language === 'tg' ? 'Ҷамъият' : 'Community',
      description: language === 'uz' ? 'O\'quvchilar birgalikda hamkorlik qilishi va o\'sishi mumkin bo\'lgan qo\'llab-quvvatlovchi jamiyat qurish' : language === 'ru' ? 'Создание поддерживающего сообщества, где учащиеся могут сотрудничать и расти вместе' : language === 'tg' ? 'Сохтани ҷамъияти дастгир, ки дар он донишҷӯён метавонанд ҳамкорӣ кунанд ва якҷоя мепароянд' : 'Building a supportive community where learners can collaborate and grow together'
    },
    {
      icon: Award,
      title: language === 'uz' ? 'A\'lo' : language === 'ru' ? 'Превосходство' : language === 'tg' ? 'Беҳтарин' : 'Excellence',
      description: language === 'uz' ? 'Ajoyib ta\'lim tajribalari va natijalarni taqdim etishga sodiqligimiz' : language === 'ru' ? 'Приверженность предоставлению исключительных образовательных опытов и результатов' : language === 'tg' ? 'Таълимоти махсус ва натиҷахоро пешкаш кардан ба вакфияти мо' : 'Committed to delivering exceptional educational experiences and outcomes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-linear-to-r from-brand-from to-brand-to text-primary-foreground py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {language === 'uz' ? 'Bit-Soft IT Akademiyasi haqida' : language === 'ru' ? 'О Bit-Soft IT Академии' : language === 'tg' ? 'Дар бораи Bit-Soft IT Академия' : 'About Bit-Soft IT Academy'}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {language === 'uz' ? 'Sifatli ta\'lim, amaliy o\'qitish va sanoat tajribasi orqali kelajak dasturchilarini qo\'llab-quvvatlash' : language === 'ru' ? 'Расширение возможностей следующего поколения разработчиков через качественное образование, практическое обучение и отраслевую экспертизу' : language === 'tg' ? 'Дар бораи дасткардаани насли ояндаи барномасозон тавассути таълими сифатдор, таълими амалӣ ва таҷрибаи саноат' : 'Empowering the next generation of developers through quality education, hands-on learning, and industry expertise'}
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language === 'uz' ? 'Bizning Missiyamiz' : language === 'ru' ? 'Наша миссия' : language === 'tg' ? 'Миссияи мо' : 'Our Mission'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {language === 'uz' ? 'Bit-Soft IT Akademiyasida bizning missiya - sifatli texnik ta\'limga kirishni demokratik qilish va istiqbolli dasturchilarga zamonaviy veb rivojlanish ko\'nikmalarini o\'zlashtirishga yordam berish.' : language === 'ru' ? 'В Bit-Soft IT Академии наша миссия - демократизировать доступ к качественному техническому образованию и помочь начинающим разработчикам освоить современные навыки веб-разработки.' : language === 'tg' ? 'Дар Bit-Soft IT Академия, миссияи мо - дастраси кардани дастрас ба таълими техникии сифатдор ва кумак кардани барномасозони ташаббускор ба монда кардани малакаҳои нави веб-разработкӣ.' : 'At Bit-Soft IT Academy, our mission is to democratize access to quality tech education and help aspiring developers master modern web development skills.'}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {language === 'uz' ? 'Биз ҳар кимса катта дастурчи бўлиши мумкинлигига ишонамиз. Бизнинг қамраб олган курсларимиз назарий билимни амалий, ҳақиқий дунё лойихалари билан бирлаштиради ва талабаларимиз тугатганида ишга тайёр бўлишини таъминлайди.' : language === 'ru' ? 'Мы верим, что у каждого есть потенциал стать отличным разработчиком. Наши комплексные курсы сочетают теоретические знания с практическими, реальными проектами, чтобы наши студенты были готовы к работе по завершении.' : language === 'tg' ? 'Мо бовар дорем, ки ҳар як касе имконияти дорад, ки барномасози беҳтарин гардад. Курсҳои комлексии мо дониши назариро бо амалии, лоиҳаҳои ҳақиқии ҷаҳонӣ муттаҳид мекунанд ва ин тариқа донишҷӯёни мо баъди анҷом коргиро тайёр мегардад.' : 'We believe that everyone has the potential to become a great developer. Our comprehensive courses combine theoretical knowledge with practical, real-world projects to ensure our students are job-ready upon completion.'}
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
