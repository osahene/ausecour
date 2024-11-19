export default function Subscriptions() {
  return (
    <>
      <div className="">
        <div className="flex min-h-screen pt-[30px] px-[40px]">
          <div className="min-w-full">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                Your Subscription
              </p>

              <div>
                <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                  You can subscribe to a subscription plan. All subscriptions
                  are per annum.
                </p>
              </div>

              <div className="mt-[30px] inline-flex border border-[#E1E3E5] shadow-[0px 1px 2px #E1E3E5] divide-[#E1E3E5] divide-x rounded-[5px]">
                {/* <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] leading-[16px] text-[13px] font-semibold font-bold py-[15px] px-[25px] rounded-l">
                  Monthly
                </button>
                <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] text-[13px] leading-[16px] font-semibold font-bold py-[15px] px-[25px] rounded-r">
                  Annual
                </button> */}
              </div>
            </div>

            <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
              <div
                key="1"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Starter
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Free
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      ¢0
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Up to 5 Dependants
                    </p>
                    {/* <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      1 User
                    </p> */}
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Instant text message
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Location sharing
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                      Default
                    </button>
                  </div>
                </div>
              </div>

              <div
                key="2"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Value
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Pro
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      ¢150
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Up to 10 Dependants
                    </p>
                    {/* <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Unlimited users
                    </p> */}
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      All of the FREE
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Automated voice calls
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Connected to related STATE agencies
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button
                      disabled
                      className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                    >
                      To be added soon
                    </button>
                  </div>
                </div>
              </div>

              <div
                key="3"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Accelerate
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Advance
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      ¢300
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Up to 15 Dependants
                    </p>
                    {/* <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Unlimited users
                    </p> */}
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      All of FREE + PRO
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Connected to related PRIVATE agencies
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      USSD services
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Safety insurance packages
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button
                      disabled
                      className="bg-[#E1E3E5]  rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                    >
                      To be added soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
