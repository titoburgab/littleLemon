import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  CreditCard,
  Check,
} from "lucide-react";
import { format } from "date-fns";

type Step = "datetime" | "guests" | "details" | "payment" | "confirmation";

interface ReservationData {
  date: Date | undefined;
  time: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export function Reservation() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("datetime");
  const [data, setData] = useState<ReservationData>({
    date: undefined,
    time: "",
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const timeSlots = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const canProceedDateTime = data.date && data.time;
  const canProceedDetails =
    data.firstName && data.lastName && data.email && data.phone;
  const canProceedPayment =
    data.cardNumber && data.cardExpiry && data.cardCvc;

  const handleSubmit = () => {
    if (step === "datetime" && canProceedDateTime) {
      setStep("guests");
    } else if (step === "guests") {
      setStep("details");
    } else if (step === "details" && canProceedDetails) {
      setStep("payment");
    } else if (step === "payment" && canProceedPayment) {
      setStep("confirmation");
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case "datetime":
        return 1;
      case "guests":
        return 2;
      case "details":
        return 3;
      case "payment":
        return 4;
      case "confirmation":
        return 5;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          {step !== "confirmation" && (
            <button
              onClick={() => {
                if (step === "datetime") {
                  navigate("/");
                } else if (step === "guests") {
                  setStep("datetime");
                } else if (step === "details") {
                  setStep("guests");
                } else if (step === "payment") {
                  setStep("details");
                }
              }}
              className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1 text-center">
            <h2 className="text-lg font-medium">
              {step === "confirmation" ? "Confirmed" : "Reserve a Table"}
            </h2>
            {step !== "confirmation" && (
              <p className="text-sm text-neutral-500">
                Step {getStepNumber()} of 5
              </p>
            )}
          </div>
          {step !== "confirmation" && <div className="w-10" />}
        </div>

        {/* Progress Bar */}
        {step !== "confirmation" && (
          <div className="h-1 bg-neutral-200">
            <motion.div
              className="h-full bg-yellow-400"
              initial={{ width: "0%" }}
              animate={{ width: `${(getStepNumber() / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <AnimatePresence mode="wait">
          {step === "datetime" && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl">Select Date</h3>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-neutral-200">
                  <input
                    type="date"
                    value={data.date ? format(data.date, "yyyy-MM-dd") : ""}
                    onChange={(e) =>
                      setData({ ...data, date: e.target.value ? new Date(e.target.value) : undefined })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors text-lg"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl">Select Time</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setData({ ...data, time })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        data.time === time
                          ? "bg-yellow-400 border-yellow-400 text-black font-medium"
                          : "bg-white border-neutral-200 text-neutral-700 hover:border-yellow-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "guests" && (
            <motion.div
              key="guests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl">Number of Guests</h3>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() =>
                      setData({ ...data, guests: Math.max(1, data.guests - 1) })
                    }
                    className="w-14 h-14 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-2xl transition-colors"
                  >
                    −
                  </button>
                  <div className="text-center">
                    <div className="text-6xl font-light mb-2">{data.guests}</div>
                    <p className="text-neutral-500">
                      {data.guests === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setData({ ...data, guests: Math.min(12, data.guests + 1) })
                    }
                    className="w-14 h-14 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-2xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl">Your Details</h3>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl">Payment Details</h3>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={data.cardNumber}
                  onChange={(e) =>
                    setData({ ...data, cardNumber: e.target.value })
                  }
                  maxLength={19}
                  className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={data.cardExpiry}
                    onChange={(e) =>
                      setData({ ...data, cardExpiry: e.target.value })
                    }
                    maxLength={5}
                    className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={data.cardCvc}
                    onChange={(e) =>
                      setData({ ...data, cardCvc: e.target.value })
                    }
                    maxLength={3}
                    className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-100 rounded-xl">
                <p className="text-sm text-neutral-600">
                  A deposit of $20 per person will be charged to hold your
                  reservation. This will be credited to your final bill.
                </p>
              </div>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl mb-2">Reservation Confirmed!</h3>
              <p className="text-neutral-600 mb-8">
                We're looking forward to seeing you
              </p>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200 space-y-4 mb-8">
                <div className="pb-4 border-b border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">Date & Time</p>
                  <p className="text-lg">
                    {data.date && format(data.date, "EEEE, MMMM d, yyyy")} at{" "}
                    {data.time}
                  </p>
                </div>
                <div className="pb-4 border-b border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">Party Size</p>
                  <p className="text-lg">
                    {data.guests} {data.guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
                <div className="pb-4 border-b border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">Name</p>
                  <p className="text-lg">
                    {data.firstName} {data.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Contact</p>
                  <p className="text-lg">{data.email}</p>
                  <p className="text-neutral-600">{data.phone}</p>
                </div>
              </div>

              <p className="text-sm text-neutral-500 mb-6">
                A confirmation has been sent to {data.email}
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-yellow-400 text-black py-4 px-6 rounded-full font-medium"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      {step !== "confirmation" && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-200">
          <motion.button
            onClick={handleSubmit}
            disabled={
              (step === "datetime" && !canProceedDateTime) ||
              (step === "details" && !canProceedDetails) ||
              (step === "payment" && !canProceedPayment)
            }
            className="w-full bg-yellow-400 text-black py-4 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {step === "payment" ? "Confirm Reservation" : "Continue"}
          </motion.button>
        </div>
      )}
    </div>
  );
}
