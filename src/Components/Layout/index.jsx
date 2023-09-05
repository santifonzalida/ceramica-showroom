const Layout = ({ children }) => {
    return (
        <div className="flex flex-col items-center mt-20 ml-2 ">
            {children}
        </div>
    );
}

export { Layout };