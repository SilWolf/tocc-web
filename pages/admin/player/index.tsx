import { NextPage } from 'next'

const AdminIndexPage: NextPage = () => {
	return (
		<>
			<div className='space-y-4'>
				<div>
					<table className='table-default'>
						<thead>
							<tr>
								<th>名字</th>
								<th>編號</th>
								<th>Email</th>
								<th>擁有角色數</th>
								<th>最活躍角色</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>月月</td>
								<td>MM-1929A</td>
								<td>silwolf1121@gmail.com</td>
								<td>3/3</td>
								<td>卡洛特</td>
							</tr>
							<tr>
								<td>月月</td>
								<td>MM-1929A</td>
								<td>silwolf1121@gmail.com</td>
								<td>3/3</td>
								<td>卡洛特</td>
							</tr>
							<tr>
								<td>月月</td>
								<td>MM-1929A</td>
								<td>silwolf1121@gmail.com</td>
								<td>3/3</td>
								<td>卡洛特</td>
							</tr>
							<tr>
								<td>月月</td>
								<td>MM-1929A</td>
								<td>silwolf1121@gmail.com</td>
								<td>3/3</td>
								<td>卡洛特</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}
export default AdminIndexPage
