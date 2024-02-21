import bleach


class CommonUtils:
    def sanitize_input(input_text: str):
        return bleach.clean(input_text)
