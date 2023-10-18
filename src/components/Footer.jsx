
export default function Footer() {
  return (
    <>
        <section className="flex flex-col gap-5 sm:flex-row sm:justify-evenly sm:items-start items-center pt-10 pb-10 bg-bg-footer">
            <div className="text-center">
                <p className="font-semibold text-letter sm:text-base text-sm">About us</p>
                <ul className="sm:text-sm text-xs text-gray-footer">
                    <li>Shopsmart</li>
                </ul>
            </div>

            <div className="text-center">
                <p className="font-semibold text-letter sm:text-base text-sm">Contact us</p>
                <ul className="sm:text-sm text-xs text-gray-footer">
                    <li>shopsmart@gmail.com</li>
                    <li>Location</li>
                </ul>
            </div>

            <div className="text-center">
                <p className="font-semibold text-letter sm:text-base text-sm">Help</p>
                <ul className="sm:text-sm text-xs text-gray-footer">
                    <li>Frequent question</li>
                </ul>
            </div>

            <div className="text-center">
                <p className="font-semibold text-letter sm:text-base text-sm">Social Media</p>
                <ul className="sm:text-sm text-xs  text-gray-footer">
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
            </div>
            
        </section>
        <footer className="bg-bg-footer border-t-2 flex flex-col gap-3 items-center sm:flex-row sm:justify-center py-5 text-gray-footer sm:text-sm text-xs">
            <p>Copyright ©</p>
            <span>2022-2023 ShopSmart</span>
            <span>Developed by SergioV</span>
        </footer>
    </>
  )
}
