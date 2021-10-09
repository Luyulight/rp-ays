export default {
	isMobile: /^1\d{10}$/,
	isEmail: /^([A-Za-z0-9_\-\.])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	isPassword: /^[a-zA-Z\d!#$%&*,.:;<>?@^_`~]{8,16}$/,
	isPasswordNoLength: /^.{1,128}$/,
	isGiftCode: /^[0-9A-Z]{16,20}$/,
	isSmsCode: /^\d{6}$/,
}