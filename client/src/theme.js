import { extendTheme } from "@chakra-ui/react";

const overrides = extendTheme({
    styles: {
        global: (props) => ({
            'html, body': {
                color: props.colorMode === 'dark' ? 'white' : 'gray.600',
                fontFamily: '"Nunito", sans-serif"'
            },
        }),
    },
});

const AppTheme = extendTheme(overrides);

export default AppTheme;