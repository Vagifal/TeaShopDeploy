import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const currency = "EUR";
const style = { "layout": "horizontal", "color": "black", "label": "pay" };

const ButtonWrapper = ({ currency, showSpinner, amount, onSuccess }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then(function (data) {
                    onSuccess(data);
                }).then(() => alert("You have successfully placed an order"));
            }}
            amount={amount}
        />
    </>
    );
}

export default function App({ total, onSuccess }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": "ARWTtpYDwQchI7PcBShTGwh2iKKXy8fQ2ZLmWMM_tb7XvwiUC8TLMIMjkwEQRDjlK53HVoc7Hkc0J7Ny",
                    components: "buttons",
                    currency: "USD"
                }}
            >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    amount={total}
                    onSuccess={onSuccess}
                />
            </PayPalScriptProvider>
        </div>
    );
}