import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {

  allServices = [
    {
      name: "Escrow Service",
      description: "Trust is the foundation of any transaction. Our Escrow Service embodies that trust as a neutral guardian, ensuring smooth and secure exchanges. Whether you're buying, selling, or negotiating, we're in the middle, safeguarding everyone's interests. With our Escrow Service, transactions aren't just transactions – they're promises kept."
    },
    {
      name:"Auction Representation",
      description:"No need to participate in auctions all by yourself. Think of our Auction Representation service as your trusted partner in the competitive world of bidding – both locally and internationally. With our experienced team by your side, you'll feel more confident and in the know. We help you make smart, strategic bids, while handling all the complicated stuff. Your focus? Sealing the deal and winning that auction."
    },
    {
      name:"Investment and Asset managment",
      description:"Managing assets requires skill. Our Asset Management service specializes in preserving and growing your investments. Whether it's traditional holdings or modern ventures, our team designs strategies that match your financial goals. Trust your assets to professionals who are dedicated to your success."
    },
    {
      name:"Cryptocurrency Flexibility",
      description:"Venture into the world of cryptocurrencies with assurance. Our Crypto Procurement service is your gateway to a hassle-free introduction to digital currencies. Our proficiency guarantees a dependable and secure crypto experience. Plus, we extend our assistance to facilitate crypto-based transactions for items such as real estate, automobiles, and auction purchases."
    },
    {
      name:"Referral Program Commission",
      description:"Do you have associates, colleagues, or business connections who could benefit from our range of services? Introduce them to us, and as they experience the value we provide, you'll be rewarded in return. For every referral that turns into a success story, we express our gratitude with well-deserved commissions. This is more than a mere suggestion – it's a strategic partnership that propels us both towards shared success."
    },
    {
      name:"Free Zone Depository",
      description:"Your valuable assets deserve a secure sanctuary. Our Free Zone Depository provides a fortified haven, combining security and accessibility. With state-of-the-art facilities and protocols, your assets rest in safe hands, ready for your command whenever the need arises."
    },
    {
      name:"Additional Services",
      description:"Discover the full array of services we offer – they're anything but ordinary. From Logistics Services and Product Verification to Fiduciary Services, Accounting, Audit, and our deep knowledge in Real Estate, we're attuned to various aspects that suit your distinct requirements. It's not just about transactions; we're here to be your trusted partner every step of the way, ensuring your financial journey is well-guided and successful."
    }
  ]

  constructor() { }
}
