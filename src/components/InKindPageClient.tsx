"use client";

import React, { useState } from "react";
import { Gift, Utensils, Shirt, BookOpen, Heart, Stethoscope, Home, Check, Copy, Package, Truck, MapPin, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { InKindFormModal } from "@/components/InKindFormModal";

interface InKindPageClientProps {
  associationBankRib?: string;
  associationBankName?: string;
  associationAddress?: string;
  associationPhone?: string;
}

export function InKindPageClient({
  associationBankRib = "011 810 0000 1234567890 123 45",
  associationBankName = "البنك الشعبي - وكالة الصويرة الغزوة",
  associationAddress = "حي الغزوة، طريق سيدي كاوكي، الصويرة - المغرب",
  associationPhone = "0524471234 / 0661123456",
}: InKindPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialItemName, setInitialItemName] = useState("مواد غذائية أساسية");
  const [copied, setCopied] = useState(false);

  const handleOpenModal = (itemName: string) => {
    setInitialItemName(itemName);
    setIsModalOpen(true);
  };

  const handleCopyRib = () => {
    navigator.clipboard.writeText(associationBankRib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const wishlistItems = [
    {
      id: "food_dry",
      category: "food",
      categoryName: "التغذية والمواد الغذائية",
      icon: Utensils,
      title: "المواد الغذائية الجافة والأساسية",
      urgency: "مطلوب دائماً",
      urgencyColor: "bg-red-500/10 text-red-600 border-red-500/20",
      description: "دقيق، زيت المائدة، حليب، أرز، سكر، قطنيات (عدس، حمص)، طماطم مصبرة، جبن، وعسل لمطبخ الدار اليومي.",
      quantityTarget: "تغطية شهرية مستمرة لأكثر من 420 طفلاً",
    },
    {
      id: "clothes_winter",
      category: "clothes",
      categoryName: "الملابس والأغطية",
      icon: Shirt,
      title: "الأغطية الشتوية والملابس والدافئة",
      urgency: "احتياج مستعجل",
      urgencyColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      description: "أغطية شتوية سميكة دافئة، ملابس دافئة للأطفال واليافعين من سن 4 إلى 18 سنة، جاكيتات، وأحذية شتوية.",
      quantityTarget: "أغطية وملابس دافئة جديدة أو ممتازة الحالات",
    },
    {
      id: "school_stationery",
      category: "school",
      categoryName: "الأدوات والكتب المدرسية",
      icon: BookOpen,
      title: "الحقائب والأدوات المدرسية والكتب",
      urgency: "مطلوب للدراسة",
      urgencyColor: "bg-sky-500/10 text-sky-600 border-sky-500/20",
      description: "دفاتر من مختلف الأحجام، أقلام، محفظات جودة عالية، قصص وقواميس، وحواسيب لقاعة الإعلاميات والتعليم.",
      quantityTarget: "حقائب ولوازم مدرسية لجميع المستويات",
    },
    {
      id: "medical_hygiene",
      category: "health",
      categoryName: "الصحة والمستلزمات الطبية",
      icon: Stethoscope,
      title: "مستلزمات النظافة والأدوية والمعدات",
      urgency: "احتياج دائم",
      urgencyColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      description: "معجون وصابون وشامبو، مستلزمات نظافة الدار، صندوق الإسعافات والأدوية الأساسية، ومعدات طبية خفيفة.",
      quantityTarget: "مواد نظافة وتطهير يومية بالدار",
    },
    {
      id: "furniture_home",
      category: "furniture",
      categoryName: "التجهيزات والأثاث",
      icon: Home,
      title: "التجهيزات الكهربائية وأثاث الدار",
      urgency: "احتياج لوجستي",
      urgencyColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      description: "آلات غسيل ملابس كبيرة، ثلاجة وتلفاز، أسرة دائرية/حديدية ومطليات أسرة، أواني ومستلزمات مطبخ الدار.",
      quantityTarget: "تأثيث وتجهيز مرافق إقامة الأطفال",
    },
    {
      id: "eid_clothes",
      category: "clothes",
      categoryName: "الملابس والأغطية",
      icon: Shirt,
      title: "كسوة الأعياد والأنشطة والرياضة",
      urgency: "مناسبات وأعياد",
      urgencyColor: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      description: "ملابس تقليدية وجديدة لعيد الفطر وعيد الأضحى، بالإضافة لملابس وأحذية رياضية للأنشطة والرحلات.",
      quantityTarget: "كسوة جديدة مخصصة للأطفال",
    },
  ];

  const categories = [
    { id: "all", label: "جميع الاحتياجات العينية" },
    { id: "food", label: "التغذية والمواد الغذائية" },
    { id: "clothes", label: "الملابس والأغطية" },
    { id: "school", label: "الأدوات والكتب المدرسية" },
    { id: "health", label: "المستلزمات الطبية والنظافة" },
    { id: "furniture", label: "التجهيزات والأثاث" },
  ];

  const filteredItems = selectedCategory === "all"
    ? wishlistItems
    : wishlistItems.filter(item => item.category === selectedCategory);

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 overflow-hidden">
      {/* 1. Hero Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-bold tracking-wider mx-auto border border-emerald-500/20">
              <Gift className="w-4 h-4 text-emerald-600" />
              قائمة الاحتياجات والمستلزمات الحية • دارنا بالصويرة
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-black text-charcoal sm:text-6xl leading-tight">
              التبرعات العينية والمادية المباشرة
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80 font-medium max-w-3xl mx-auto">
              تتيح لك التبرعات العينية توفير السلع والمستلزمات الضرورية لتسيير الحياة اليومية للأطفال بدار الرعاية. تصفّح الاحتياجات الحية واختر ما تود التعهد بتوفيره.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.03]"
                  : "bg-white hover:bg-surface text-charcoal/80 border-border-custom hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={item.id} delay={0.1 * (idx + 1)} direction="up">
                <div className="group relative flex flex-col justify-between rounded-3xl p-7 bg-white border border-border-custom shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.urgencyColor}`}>
                        {item.urgency}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-charcoal group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-charcoal/80 font-medium min-h-[50px]">
                      {item.description}
                    </p>

                    <div className="bg-surface p-3.5 rounded-xl border border-border-custom text-xs font-bold text-charcoal/70 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary shrink-0" />
                      <span>{item.quantityTarget}</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(item.title)}
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/15 hover:scale-[1.02]"
                    >
                      <Gift className="w-4 h-4" />
                      التعهد بتوفير هذه المادة
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 3. Financial In-Kind Alternative ( الحساب البنكي لشراء التغذية والسلع محلياً ) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-primary/5 via-white to-surface rounded-3xl border border-primary/20 p-8 sm:p-12 shadow-xl shadow-primary/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 w-fit">
                <Heart className="w-3.5 h-3.5 fill-current" />
                البديل المالي المباشر للشراء المحلّي
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-black text-charcoal">
                تعذّر عليك توصيل السلع بنفسك؟
              </h3>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-medium">
                يمكنك التبرع بـ المبلغ المالي المقابل لتكلفة التغذية أو المستلزمات، وسيتولى مقتصد الدار شراءها مباشرة من الأسواق المحلية بالصويرة وتوثيقها بالفواتير الرسمية.
              </p>
              
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-bold text-charcoal/60">الحساب البنكي الرسمي المعتمد للتبرعات العينية والمالية:</span>
                <span className="text-sm font-bold text-primary">{associationBankName}</span>
              </div>
            </div>

            {/* Bank Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border-custom shadow-md flex flex-col gap-4">
              <span className="text-xs font-extrabold text-charcoal uppercase tracking-wider block">
                رقم الحساب البنكي (RIB)
              </span>

              <div className="bg-surface p-4 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono text-lg sm:text-xl font-black text-primary tracking-widest text-center" dir="ltr">
                  {associationBankRib}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRib}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-md shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      تم النسخ!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      نسخ رقم الـ RIB
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-charcoal/60 font-medium pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حساب رسمي مراقب ومخصص لدار الأيتام بالصويرة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Delivery & Drop-off Guidelines */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-bold text-charcoal">التسليم المباشر بالدار</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed font-medium">
              نرحب بالمتبرعين يومياً بمقر الدار: <span className="font-bold text-charcoal">{associationAddress}</span> لاستلام الشحنات والترحيب بكم.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-bold text-charcoal">الشحن والإرسال عبر البريد</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed font-medium">
              يمكنكم إرسال الطرود والسلع عبر شركات النقل السريع أو أمانات بالصويرة باسم الجمعية مع إشعارنا برقم التتبع.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg font-bold text-charcoal">تنسيق الاستلام والجمع</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed font-medium">
              للتبرعات الكبيرة أو الأثاث والتجهيزات بالصويرة ومحيطها، يمكن التنسيق مع فريق الدار لاستلامها عبر الهاتف: <span className="font-bold text-primary">{associationPhone}</span>.
            </p>
          </div>
        </div>
      </section>

      {/* In-Kind Pledge Modal */}
      <InKindFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialItemName={initialItemName}
        associationAddress={associationAddress}
        associationPhone={associationPhone}
      />
    </div>
  );
}
