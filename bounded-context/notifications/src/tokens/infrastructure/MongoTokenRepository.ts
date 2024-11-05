import { TokenRepository } from "../domain/TokenRepository";
import { Token } from "../domain/Token";
import { TokenStatus } from "../domain/value-objects/TokenStatus";
import mongoose, { Document, Schema } from "mongoose";

interface TokenDocument extends Document {
  id: string;
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  status: string;
}

const tokenSchema = new Schema<TokenDocument>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, required: true },
});

const TokenModel = mongoose.model<TokenDocument>("Token", tokenSchema);

export class MongoTokenRepository implements TokenRepository {
  async save(token: Token): Promise<void> {
    await TokenModel.findOneAndUpdate(
      { id: token.getId() },
      {
        userId: token.getUserId(),
        code: token.getCode(),
        createdAt: token.getCreatedAt(),
        expiresAt: token.getExpiresAt(),
        status: token.getStatus().getValue(),
      },
      { upsert: true, new: true }
    ).exec();
  }

  async findByUserId(userId: string): Promise<Token | null> {
    const tokenDocument = await TokenModel.findOne({ userId })
      .sort({ createdAt: -1 })
      .exec();
    return tokenDocument ? this.mapDocumentToToken(tokenDocument) : null;
  }

  async findByCode(code: string): Promise<Token | null> {
    const tokenDocument = await TokenModel.findOne({ code }).exec();
    return tokenDocument ? this.mapDocumentToToken(tokenDocument) : null;
  }

  async updateStatus(tokenId: string, status: TokenStatus): Promise<void> {
    await TokenModel.updateOne(
      { id: tokenId },
      { status: status.getValue() }
    ).exec();
  }

  private mapDocumentToToken(tokenDocument: TokenDocument): Token {
    return new Token(
      tokenDocument.userId,
      tokenDocument.code,
      tokenDocument.createdAt,
      tokenDocument.expiresAt,
      TokenStatus.from(tokenDocument.status),
      tokenDocument.id
    );
  }
}
