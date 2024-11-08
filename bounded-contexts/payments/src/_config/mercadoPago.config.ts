import { MercadoPagoConfig } from "mercadopago";
import { env } from "./env.config";

export const client: MercadoPagoConfig = {
  accessToken: env.mercadopago.MERCADOPAGO_ACCESS_TOKEN,
};
