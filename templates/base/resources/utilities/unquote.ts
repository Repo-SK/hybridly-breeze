export default function unquote(input: string) {
    return input.replace(/^"(.*)"$/, '$1');
}
