type TitleProps = {
	children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
	return <div className="title">{children}</div>;
}
