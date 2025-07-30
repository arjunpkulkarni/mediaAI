import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing({ onGetStarted }: { onGetStarted: () => void }) {
  const tiers = [
    {
      name: "Quick Kit",
      price: "$3.99",
      priceSuffix: "",
      features: [
        "1 AI Generated Media Kit PDF",
        "Basic Template",
        "Downloadable and Sent to Email",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro Creator",
      price: "$9.99",
      priceSuffix: "/month",
      features: [
        "1 AI Generated Media Kit PDF Automatically Emailed Over Each Month",
        "Updated Stats",
        "Unlimited edits to layout, bio, etc",
        "Access to Premium (higher converting) Templates",
      ],
      cta: "Go Pro",
    },
    {
      name: "Lifetime Creator",
      price: "$49.99",
      priceSuffix: "",
      features: ["Unlimited Media Kit Generations"],
      cta: "Go Lifetime",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-brand-dark">{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-brand-dark">{tier.price}</span>
                  <span className="text-brand-dark/70">{tier.priceSuffix}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-brand-dark/90">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-brand-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={onGetStarted} className="w-full bg-gradient-primary text-white hover:opacity-90">
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 