export default function ChangeTheme(styles : Record<string, string>, className: string, theme : string){
    return [styles[className], styles[theme]].join(' ');
}