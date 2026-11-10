CREATE TABLE "activation_tokens" (
    "token_hash" VARCHAR(64) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activation_tokens_pkey" PRIMARY KEY ("token_hash")
);

CREATE UNIQUE INDEX "activation_tokens_usuario_id_key"
ON "activation_tokens"("usuario_id");

ALTER TABLE "activation_tokens"
ADD CONSTRAINT "activation_tokens_usuario_id_fkey"
FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id")
ON DELETE CASCADE ON UPDATE NO ACTION;
