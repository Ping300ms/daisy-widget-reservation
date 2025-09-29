type PaymentSimulatorProps = {
    onResult: (success: boolean) => void;
};

function PaymentSimulator({ onResult }: PaymentSimulatorProps) {
    const handlePayment = () => {
        const success = Math.random() > 0.3; // 70% succès
        setTimeout(() => {
            onResult(success);
        }, 1000);
    };

    return (
        <div className="text-center mt-4">
            <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Payer maintenant
            </button>
        </div>
    );
}

export default PaymentSimulator;
