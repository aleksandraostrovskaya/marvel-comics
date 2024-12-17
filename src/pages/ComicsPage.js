import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import ComicsList from '../components/comicsList/ComicsList'
import AppBanner from '../components/appBanner/AppBanner'

function ComicsPage() {
	return (
		<>
		<ErrorBoundary>
			<AppBanner/>
		</ErrorBoundary>
			<ErrorBoundary>
				<ComicsList/>
			</ErrorBoundary>
		</>
	)
}

export default ComicsPage
