import {
  Text,
  View,
  StyleSheet,
  Font,
  BlobProvider,
  Document,
  Page,
} from "@react-pdf/renderer";

import { useBasketContext } from "../../context/basket/BasketContext";
import { Box, Modal } from "@mui/material";
import { useAuthContext } from "../../context/auth/AuthContext";
import { InvoiceViewer } from "./InvoiceViewer";
import Roboto from "../../assets/font/roboto/Roboto-Regular.ttf";
import RobotoBold from "../../assets/font/roboto/Roboto-Black.ttf";
import { useTranslation } from "react-i18next";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: Roboto,
    },
    {
      src: RobotoBold,
      fontWeight: "bold",
    },
  ],
});


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eee",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  section: {
    color: "black",
    textAlign: "center",
    margin: 5,
    gap: 12,
    paddingBottom: 12,
    borderBottom: "5px solid black",
  },
  line: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    borderBottom: "2px dotted black",
  },
  itemName: {
    display: "flex",
    textAlign: "left",
    width: "60%",
    textOverflow: "ellipsis",
  },
});

export const InvoiceModal = ({ open, handleClose }) => {
  const { cart, subTotal, total, payableAmount, customerEmail, amountPaid } =
    useBasketContext();
  const { user } = useAuthContext();
  const currentDate = new Date();
  const { i18n, t } = useTranslation();
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>SAU TOYOTA CASH REGISTER</Text>
          <View style={styles.line}>
            <Text>{t("date")}: </Text>
            <Text>{currentDate.toLocaleDateString(i18n.language)}</Text>
          </View>
          <View style={styles.line}>
            <Text>{t("hour")}: </Text>
            <Text>{currentDate.toLocaleTimeString(i18n.language)}</Text>
          </View>
          <View style={styles.line}>
            <Text>{t("cashier")}: </Text>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View style={[styles.section, { gap: 22 }]}>
          {cart.map((x) => (
            <View key={x.id} style={styles.items}>
              <Text style={styles.itemName}>{x.name}</Text>
              <View style={{ flexDirection: "row", gap: 24 }}>
                <Text>
                  {t("price")}:{x.price} {t("quantity")}: {x.count}
                </Text>
                <Text>{(x.price * x.count).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[styles.items, { padding: 10 }]}>
          <Text>
            {t("subTotal")}: {subTotal}
          </Text>
          <Text>
            {t("total")}: {total}
          </Text>
          <Text>
            {t("amountPaid")}: {amountPaid}
          </Text>
          {subTotal - total > 0 ? (
            <Text>
              {t("discount")}: {(subTotal - total).toFixed(2)}
            </Text>
          ) : null}
          {payableAmount < 0 ? (
            <Text>
              {t("changeMoney")}: {Math.abs(payableAmount).toFixed(2)}
            </Text>
          ) : null}
        </View>
        {customerEmail ? (
          <View style={[styles.items, { padding: 10 }]}>
            <Text>
              {t("customerEmail")}: {customerEmail}
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ height: "600px", width: "450px" }} className="modal_box">
        <BlobProvider document={doc}>
          {({ blob, url, loading, error }) => {
            return loading ? null : error ? null : <InvoiceViewer url={url} />;
          }}
        </BlobProvider>
      </Box>
    </Modal>
  );
};
