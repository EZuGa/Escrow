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
      name:"Referral Program",
      description:"Do you have associates, colleagues, or business connections who could benefit from our range of services? Introduce them to us, and as they experience the value we provide, you'll be rewarded in return. For every referral that turns into a success story, we express our gratitude with well-deserved commissions. This is more than a mere suggestion – it's a strategic partnership that propels us both towards shared success."
    },
    {
      name:"Depository Services",
      description:"Your valuable assets deserve a secure sanctuary. Our Free Zone Depository provides a fortified haven, combining security and accessibility. With state-of-the-art facilities and protocols, your assets rest in safe hands, ready for your command whenever the need arises."
    },
    // {
    //   name:"Additional Services",
    //   description:"Discover the full array of services we offer – they're anything but ordinary. From Logistics Services and Product Verification to Fiduciary Services, Accounting, Audit, and our deep knowledge in Real Estate, we're attuned to various aspects that suit your distinct requirements. It's not just about transactions; we're here to be your trusted partner every step of the way, ensuring your financial journey is well-guided and successful."
    // },
    {
      name:"Legal Service",
      description: "At Escrow and Trust, our Legal Service is your steadfast ally in navigating the complex world of legal transactions. We understand that legal matters can be daunting, which is why we offer comprehensive support to ensure your interests are safeguarded. Our team of experienced legal professionals is dedicated to providing expert guidance and ensuring that all legal aspects of your transactions are handled with precision and care. Whether it's contracts, compliance, or any legal documentation, we've got you covered. With our Legal Service, you can embark on your financial journey with confidence, knowing that your legal needs are in capable hands."
    },
    {
      name: "Accounting and Audit",
      description: "Sound financial management is the cornerstone of successful ventures. Our Accounting and Audit service is designed to ensure your financial transactions are not only transparent but also compliant with regulatory standards. We offer meticulous financial analysis, comprehensive audits, and expert accounting services to guarantee that your financial records are accurate and in adherence to all relevant regulations. With our expertise, your financial decisions are based on solid, well-organized data, giving you the peace of mind to make informed choices and reach your financial goals."
    },
    {
      name: "Logistics and Storage",
      description: "Efficient logistics and secure storage are vital components of any successful business operation. At Escrow and Trust, we provide Logistics and Storage solutions that meet the highest standards of reliability and security. Whether you require the safe transportation of assets, warehousing, or inventory management, our team is equipped to handle your logistics needs with precision. Our state-of-the-art storage facilities offer a secure haven for your valuable assets, accessible at your convenience. With our Logistics and Storage service, you can focus on your core business activities, knowing that the logistics and storage of your assets are in capable hands."
    }
  ]

  constructor() { }
}
