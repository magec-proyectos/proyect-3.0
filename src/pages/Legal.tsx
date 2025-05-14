
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Legal = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Rules & Legal Information</h1>
          <p className="text-gray-400 mb-8">Important information about rules, terms, and policies.</p>
          
          <Tabs defaultValue="rules" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6 w-full md:w-auto">
              <TabsTrigger value="rules">Betting Rules</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="responsible">Responsible Gaming</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rules">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Betting Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-200">
                  <section>
                    <h3 className="text-lg font-bold mb-2">1. General Rules</h3>
                    <p>These rules govern all bets placed on our platform. By placing a bet, you agree to be bound by these rules.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>All users must be at least 18 years old to place bets.</li>
                      <li>All bets are final once confirmed and cannot be canceled.</li>
                      <li>We reserve the right to void bets in cases of obvious errors or technical issues.</li>
                      <li>The maximum payout for any single bet is $100,000.</li>
                      <li>Bets will only be accepted up to the official start time of the event.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">2. Sports Betting Rules</h3>
                    <p>The following rules apply specifically to sports betting on our platform.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>All bets are settled based on the official result as declared by the governing body.</li>
                      <li>If an event is postponed and rescheduled within 48 hours, bets will stand.</li>
                      <li>If an event is abandoned or postponed beyond 48 hours, all bets will be void unless settlement is already determined.</li>
                      <li>For player props, the player must participate in the event for bets to stand.</li>
                      <li>Dead heat rules apply when two or more selections tie for a position.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">3. Casino Game Rules</h3>
                    <p>These rules apply to all casino games available on our platform.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>All games are operated using certified random number generators.</li>
                      <li>Game rules specific to each casino game are available within the game interface.</li>
                      <li>In case of a malfunction, all affected bets will be void.</li>
                      <li>We reserve the right to refuse service without giving a reason.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">4. Dispute Resolution</h3>
                    <p>In case of disputes regarding bet settlement or any other betting-related matters:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>All disputes must be submitted within 7 days of settlement.</li>
                      <li>Our customer service team will review all disputes and make a decision based on our rules.</li>
                      <li>If you are not satisfied with the decision, you may escalate the dispute to management.</li>
                      <li>Our management's decision is final in all disputes.</li>
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="terms">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-200">
                  <section>
                    <h3 className="text-lg font-bold mb-2">1. Agreement to Terms</h3>
                    <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">2. Account Registration</h3>
                    <p>To use certain features of the service, you must register for an account. When you register, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">3. Service Modifications</h3>
                    <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">4. User Content</h3>
                    <p>Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You retain all rights in, and are solely responsible for, the content you post.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">5. Prohibited Activities</h3>
                    <p>You may not engage in any of the following prohibited activities:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>Using the service for any illegal purpose or to violate laws.</li>
                      <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers.</li>
                      <li>Using the service in any manner that could disable, overburden, damage, or impair the site.</li>
                      <li>Creating multiple accounts for abusive purposes.</li>
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-200">
                  <section>
                    <h3 className="text-lg font-bold mb-2">1. Information Collection</h3>
                    <p>We collect several types of information for various purposes to provide and improve our service to you.</p>
                    <h4 className="font-semibold mt-3">Personal Data</h4>
                    <p>While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Phone number</li>
                      <li>Address, State, Province, ZIP/Postal code, City</li>
                      <li>Payment information</li>
                      <li>Usage data</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">2. Use of Data</h3>
                    <p>We use the collected data for various purposes:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>To provide and maintain our service</li>
                      <li>To notify you about changes to our service</li>
                      <li>To allow you to participate in interactive features</li>
                      <li>To provide customer support</li>
                      <li>To gather analysis or valuable information to improve our service</li>
                      <li>To monitor the usage of our service</li>
                      <li>To detect, prevent and address technical issues</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">3. Data Security</h3>
                    <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                  </section>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="responsible">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Responsible Gaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-200">
                  <section>
                    <h3 className="text-lg font-bold mb-2">1. Our Commitment</h3>
                    <p>We are committed to encouraging responsible gambling and minimizing the potential for harm. Our platform offers various tools to help users stay in control of their gambling activities.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">2. Self-Assessment</h3>
                    <p>Ask yourself the following questions to assess your gambling behavior:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>Do you gamble to escape from problems or to avoid feeling bad?</li>
                      <li>Have you lied to family members or others about your gambling?</li>
                      <li>Have you risked or lost relationships, jobs, or educational opportunities due to gambling?</li>
                      <li>Do you feel anxious or irritable when trying to reduce or stop gambling?</li>
                      <li>Have you needed to gamble with increasing amounts of money to feel excitement?</li>
                    </ul>
                    <p className="mt-2">If you answered yes to any of these questions, we encourage you to consider using our responsible gambling tools or seek professional help.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">3. Responsible Gambling Tools</h3>
                    <p>We provide the following tools to help you maintain control:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li><strong>Deposit Limits:</strong> Set daily, weekly, or monthly limits on how much you can deposit.</li>
                      <li><strong>Time Limits:</strong> Set limits on how long you can play in a single session.</li>
                      <li><strong>Loss Limits:</strong> Set limits on how much you can lose in a specific period.</li>
                      <li><strong>Reality Check:</strong> Receive notifications about how long you've been playing.</li>
                      <li><strong>Self-Exclusion:</strong> Take a break from gambling for a set period.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-2">4. Support Resources</h3>
                    <p>If you're concerned about your gambling habits, please contact one of these organizations for help:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                      <li>National Problem Gambling Helpline: 1-800-522-4700</li>
                      <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
                      <li>GamCare: www.gamcare.org.uk</li>
                      <li>BeGambleAware: www.begambleaware.org</li>
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Legal;
