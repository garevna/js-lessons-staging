export const firebase = `data:image/png;base64,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`
