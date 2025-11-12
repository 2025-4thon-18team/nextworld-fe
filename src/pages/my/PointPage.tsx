// src/pages/my/PointPage.tsx
import React, { useState } from "react";
import Header from "@/components/Header";
import MySidebar from "@/components/MySidebar";
import PaymentPopup from "@/components/PaymentPopup";

const PointPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"charge" | "history" | "usage">(
    "charge",
  );
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const pointOptions = [
    { value: 1000, price: 1000 },
    { value: 3000, price: 3000 },
    { value: 5000, price: 5000 },
    { value: 10000, price: 10000 },
    { value: 15000, price: 15000 },
    { value: 20000, price: 20000 },
    { value: 30000, price: 30000 },
    { value: 50000, price: 50000 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="mx-auto mt-10 flex w-full max-w-screen-xl flex-1 px-6">
        <MySidebar point={2000} />

        <section className="ml-10 flex-1">
          <h2 className="mb-6 text-xl font-semibold">포인트</h2>

          {/* 탭 */}
          <div className="mb-8 flex space-x-4 border-b border-gray-200">
            <button
              className={`pb-2 ${activeTab === "charge" ? "border-b-2 border-purple-500 font-medium text-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("charge")}
            >
              포인트 충전
            </button>
            <button
              className={`pb-2 ${activeTab === "history" ? "border-b-2 border-purple-500 font-medium text-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("history")}
            >
              충전 내역
            </button>
            <button
              className={`pb-2 ${activeTab === "usage" ? "border-b-2 border-purple-500 font-medium text-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("usage")}
            >
              사용 내역
            </button>
          </div>

          {/* ✅ 포인트 충전 */}
          {activeTab === "charge" && (
            <div className="text-gray-700">
              <h3 className="mb-3 font-medium">충전 포인트</h3>
              <div className="mb-6 grid grid-cols-4 gap-4">
                {pointOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-md border px-4 py-3 text-center ${
                      selectedPoint === opt.value
                        ? "border-purple-500 font-semibold text-purple-600"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="point"
                      value={opt.value}
                      checked={selectedPoint === opt.value}
                      onChange={() => setSelectedPoint(opt.value)}
                      className="hidden"
                    />
                    {opt.value.toLocaleString()}P
                  </label>
                ))}
              </div>

              <p className="mb-2 text-right text-sm text-gray-500">
                총 결제 금액:{" "}
                <span className="font-semibold text-purple-600">
                  {selectedPoint
                    ? `${selectedPoint.toLocaleString()}원`
                    : "0원"}
                </span>
              </p>

              <button
                onClick={() => setShowPopup(true)}
                disabled={!selectedPoint}
                className={`w-full rounded-md py-3 font-medium text-white transition-colors ${
                  selectedPoint
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                결제하기
              </button>
            </div>
          )}

          {/* ✅ 충전 내역 */}
          {activeTab === "history" && (
            <div className="space-y-4 text-gray-700">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex justify-between border-b py-3">
                  <div>
                    <p>포인트 충전</p>
                    <p className="text-sm text-gray-400">2025.10.23 00:00:00</p>
                  </div>
                  <p className="font-medium text-purple-600">+100P</p>
                </div>
              ))}
            </div>
          )}

          {/* ✅ 사용 내역 */}
          {activeTab === "usage" && (
            <div className="space-y-4 text-gray-700">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex justify-between border-b py-3">
                  <div>
                    <p>포스팅</p>
                    <p className="text-sm text-gray-400">@naouung 구매</p>
                  </div>
                  <p className="font-medium text-red-500">-100P</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showPopup && <PaymentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PointPage;
