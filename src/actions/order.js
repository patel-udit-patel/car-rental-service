"use server";

import connect from "@/lib/database";
import { sendEmail } from "@/lib/sendEmail";
import Order from "@/models/Order";

export const orderedMail = async (id) => {
  try {
    console.log("CONTROL reaches here");

    // Step 1: Connect to the database
    await connect();

    // Step 2: Fetch order details
    const getOrder = await Order.findById(id);
    if (!getOrder) {
      console.error("Order not found");
      throw new Error("Order not found");
    }

    // Step 3: Send an email to the customer
    await sendEmail({
      email: getOrder.email, // Recipient's email
      subject: "Welcome to Code Scrapper",
      message: `Hi ${getOrder.name}, your booking has been confirmed. Thank you!`,
    });

    // Step 4: Send an email to your admin email
    await sendEmail({
      email: "udit0428t@gmail.com", // Admin email
      subject: "New Booking Alert - Car Rental Service",
      message: `Hi Admin, a new booking has been made by ${getOrder.name} (${getOrder.email}).`,
    });

    console.log("Emails sent successfully");
    return getOrder;
  } catch (error) {
    console.error("Error sending emails:", error.message);
    throw new Error("Failed to send emails");
  }
};















// "use server";

// import connect from "@/lib/database";
// import { sendEmail } from "@/lib/sendEmail";
// import Order from "@/models/Order";

// export const orderedMail = async (id) => {
//   try {
//     console.log("CONTROLl reaches here")
//     await connect();
//     const getOrder = await Order.findById(id);
//     await sendEmail({
//       order: getOrder,
//       email: getOrder.email,
//       subject: "welcome to code scrapper",
//       message: `hi there, you have booking`,
//     });

//     await sendEmail({
//       order: getOrder,
//       email: "udit0428t@gmail.com",
//       subject: "welcome to Car Rental Service",
//       message: `hi there, you have booking`,
//     });
//     return getOrder;
//   } catch (error) {}
// };
