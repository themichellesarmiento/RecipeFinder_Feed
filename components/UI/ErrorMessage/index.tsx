const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="text-accent-two text-center">
      {error === 'NEXT_REDIRECT' ? '' : error}
    </div>
  )
}
export default ErrorMessage;