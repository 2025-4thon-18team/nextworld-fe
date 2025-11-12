// src/components/PaymentPopup.tsx
import React from "react";

interface PaymentPopupProps {
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-lg font-semibold">결제 확인</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          결제를 진행하시겠습니까? 아래 결제수단을 선택해주세요.
        </p>

        <div className="mb-6 space-y-3">
          <button className="w-full rounded-md border py-2 transition hover:bg-gray-100">
            네이버페이
          </button>
          <button className="w-full rounded-md border py-2 transition hover:bg-gray-100">
            카카오페이
          </button>
          <button className="w-full rounded-md border py-2 transition hover:bg-gray-100">
            카드 결제
          </button>
          <button className="w-full rounded-md border py-2 transition hover:bg-gray-100">
            계좌 이체
          </button>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 transition hover:text-gray-800"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
