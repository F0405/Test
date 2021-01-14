import Cookies from 'js-cookie'
import JSEncrypt from 'jsencrypt'

const TokenKey = 'Admin-Token'

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz22l1GoTkoXNigeRX7+
+FVVLe6IeZZ6fG8pqOYEBPuTXpAxYfLHCVkLX9GLDvj205CDuJ/SYVOgq4ncN+3M
29uFJ0P9CZfWD6LFJ4kKakXIydSG8ZjwghEdk7yeiNyiZhiBEMLrky8P1BhxVYW8
QrYijQFx4NDnnKSe2R/fUCveQnZxga9WgErM+CSnAeY2Zi8M1ClXKKY8ZjP+4Uez
xjmOP2XOTjfRkBBEW0g8VHTJ2qlkgOlU9JF4nkmlgNewq/3c+iz3wS6rVLDqMx1c
mZnBYtntYnabvo+fky50/Vyn8q+SMBT60jEookKnbG6qMYvrevE20IhjmhkNYNOK
3QIDAQAB
-----END PUBLIC KEY-----
`
const encryptor = new JSEncrypt()
encryptor.setPublicKey(publicKey)

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getActived() {
  return Cookies.get('user_actived')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * usage:
 * import { decrypt } from '@/utils/auth'
 * decrypt(key)
 *
 * key: 需要加密的数据
 * return 加密后的数据
 */
export function decrypt(key) {
  var rsaPassWord = encryptor.encrypt(key)
  return rsaPassWord
}

